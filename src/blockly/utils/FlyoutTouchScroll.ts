import * as Blockly from 'blockly/core'

export function enableFlyoutTouchScroll(): void {
  const gestureProto = Blockly.Gesture.prototype as unknown as {
    updateIsDragging: (e: PointerEvent) => void
    flyout: Blockly.IFlyout | null
    currentDragDeltaXY: Blockly.utils.Coordinate
    calledUpdateIsDragging: boolean
    updateIsDraggingWorkspace(): void
  }

  const originalUpdateIsDragging = gestureProto.updateIsDragging

  gestureProto.updateIsDragging = function (this: typeof gestureProto, e: PointerEvent) {
    const flyout = this.flyout
    const dragDelta = this.currentDragDeltaXY

    if (e.pointerType !== 'mouse' && flyout && dragDelta && !flyout.isDragTowardWorkspace(dragDelta)) {
      this.calledUpdateIsDragging = true
      this.updateIsDraggingWorkspace()
      return
    }

    originalUpdateIsDragging.call(this, e)
  }
}

<script setup lang="ts">

import highlight from '@/skript/highlight'
import { ref } from 'vue'

const code = `
# .____                 .__
# |    |    ____   ____ |__| ____
# |    |   /  _ \ / ___\|  |/    \
# |    |__(  <_> ) /_/  >  |   |  \
# |_______ \____/\___  /|__|___|  /
#         \/    /_____/         \/
# v1.0.0
#
a   # 一个简单的登录系统
#
# 前置
# Request:
#     - skript-packet(可选 隐藏登录日志 提升安全性)
#     - - ProtocolLib
#     - skript-db(可选 用于迁移Authme数据)
#
# 测试环境
# Test Environment:
#     JDK Version: jdk-19.0.1
#     Server Version: paper-1.20.1-171
#     Skript Version: skript-2.6.4
#     Skript Depend:
#         - skript-reflect-2.3
#         - skript-packet-2.1.2
#         - skript-db-1.3.9

# ---------------------------------------------------------------- #
#   ██████╗ ██████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
#  ██╔═══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
#  ██║   ██║██████╔╝   ██║   ██║██║   ██║██╔██╗ ██║███████╗
#  ██║   ██║██╔═══╝    ██║   ██║██║   ██║██║╚██╗██║╚════██║
#  ╚██████╔╝██║        ██║   ██║╚██████╔╝██║ ╚████║███████║
#   ╚═════╝ ╚═╝        ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
#  预设

options:
    # 登录状态标志(不知道作用请不要改动)
    login_sign: "login"
    # 密码规则
    password_regex: "[!-~]{6,18}" # 数字 符号 大小写 6-18位
    # 超时时间
    timeout: a minute

# ---------------------------------------------------------------- #
#   ██████╗ ██████╗ ████████╗██╗ ██████╗ ███╗   ██╗ █████╗ ██╗
#  ██╔═══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔══██╗██║
#  ██║   ██║██████╔╝   ██║   ██║██║   ██║██╔██╗ ██║███████║██║
#  ██║   ██║██╔═══╝    ██║   ██║██║   ██║██║╚██╗██║██╔══██║██║
#  ╚██████╔╝██║        ██║   ██║╚██████╔╝██║ ╚████║██║  ██║███████╗
#   ╚═════╝ ╚═╝        ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
#  可选 - 隐藏登录命令 此处用到了 skript-packet 如果不需要可以注释整块区域

# 高版本 命令和聊天 拆分成两个数据包了 低版本 聊天开头是 / 就是命令
# 如果低版本 这里报错 可以单独注释这个
packet event play_client_chat_command: # ProtocolLib 5.x
    set {_chat} to field 0
    loginCommandAdapter(player, {_chat}) is true
    cancel event
packet event play_client_chat: # ProtocolLib 4.x
    set {_chat} to field 0
    {_chat} starts with "/"
    set {_chat} to last length of {_chat} - 1 character of {_chat}
    loginCommandAdapter(player, {_chat}) is true
    cancel event
function loginCommandAdapter(player: player, command: text) :: boolean:
    if {_command} starts with "l ", "login ", "reg " or "register ": # 这条判断语句 仅支持 Skript-2.5+ 低版本请自己改造
        execute command {_command} by {_player}
        return true
    return false

# ---------------------------------------------------------------- #
#   ██████╗ ██████╗ ████████╗██╗ ██████╗ ███╗   ██╗ █████╗ ██╗
#  ██╔═══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔══██╗██║
#  ██║   ██║██████╔╝   ██║   ██║██║   ██║██╔██╗ ██║███████║██║
#  ██║   ██║██╔═══╝    ██║   ██║██║   ██║██║╚██╗██║██╔══██║██║
#  ╚██████╔╝██║        ██║   ██║╚██████╔╝██║ ╚████║██║  ██║███████╗
#   ╚═════╝ ╚═╝        ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
#  可选 - 迁移Authme数据 此处用到了 skript-db

# 迁移命令
# command /migrateofauthme:
#     permission: skript.admin
#     trigger:
#         # 请手动修改 数据库url 以及 passwordHash 函数中的加密方式(注意)
#         # mysql 例子: mysql://localhost:3306/authme?user=root&password=root&useSSL=false
#         set {_sql} to database "sqlite://D:/Minecraft/Server/SkriptLogin-1.20.1/plugins/AuthMe/authme.db"
#         execute "select \`realname\`, \`password\` from \`authme\`" in {_sql} and store result in {_output::*}
#         loop {_output::realname::*}:
#             set {_player} to loop-value parsed as offline player
#             set {LoginPwd::%uuid of {_player}%} to {_output::password::%loop-index%}
#         send "迁移完成 总计 %size of {_output::realname::*}% 条数据!"

# ---------------------------------------------------------------- #
#   ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗
#  ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗
#  ██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║
#  ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║
#  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝
#   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝
#  命令

# 注册命令
command /register <text> <text>:
    aliases: reg
    usage: &e使用方法: /login <密码> <重复密码>
    executable by: player
    trigger:
        if {LoginPwd::%uuid of player%} is set:
            send "&c你已经注册过了, 请使用 /login <密码> 进行登录!"
            stop
        if arg-1 is not arg-2:
            send "&c两次密码不一致!"
            stop
        if arg-1 doesn't match {@password_regex}:
            send "&c密码不符合规则!"
            stop
        set {LoginPwd::%uuid of player%} to encryPassword(arg-1)
        set metadata value {@login_sign} of player to false
        send "&a注册完成!"

# 登录命令
command /login <text>:
    aliases: l
    usage: &e使用方法: /login <密码>
    executable by: player
    trigger:
        if player has metadata value {@login_sign}:
            send "&c已经登录, 不可重复登录"
            stop
        if {LoginPwd::%uuid of player%} is not set:
            send "&c请先完成注册"
            stop
        if checkPassword(arg-1, {LoginPwd::%uuid of player%}) is false:
            kick player because "&c密码错误"
            stop
        set metadata value {@login_sign} of player to false
        send "&a登录成功!"

# 更改密码命令
command /changepassword <text> <text> <text>:
    aliases: cpwd, changepwd
    usage: &e使用方法: /changepassword <旧密码> <新密码> <重复新密码>
    executable by: player
    trigger:
        if {LoginPwd::%uuid of player%} is not set:
            send "&c请先完成注册"
            stop
        if checkPassword(arg-1, {LoginPwd::%uuid of player%}) is false:
            send "&c密码错误"
            stop
        if arg-2 is not arg-3:
            send "&c两次密码不一致!"
            stop
        if arg-2 doesn't match {@password_regex}:
            send "&c密码不符合规则!"
            stop
        set {LoginPwd::%uuid of player%} to encryPassword(arg-2)
        send "&a修改密码成功!"

# 管理命令 我就不写了

# ---------------------------------------------------------------- #
#  ███████╗██╗   ██╗███████╗███╗   ██╗████████╗
#  ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝
#  █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║
#  ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║
#  ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║
#  ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝
#  事件

# 退出服务器时移除 登录标志
on quit:
    delete metadata value {@login_sign} of player

# 进入服务器时移除 登录标志
on join:
    delete metadata value {@login_sign} of player

# 当玩家进入服务器后长时间不进行登录将踢出服务器
on join:
    wait {@timeout}
    player don't have metadata value {@login_sign}
    kick player because "登录超时"

# 周期性提醒
on join:
    while player don't have metadata value {@login_sign}:
        if player is offline:
            stop
        if {LoginPwd::%uuid of player%} is set:
            send "&e使用 /login <密码> 进行登录"
        else:
            send "&e使用 /register <密码> <重复密码> 进行注册"
        wait 5 second

# 玩家未登录时 不允许移动
on join:
    set {_loc} to location of player
    while player don't have metadata value {@login_sign}:
        if player is offline:
            stop
        teleport player to {_loc}
        wait 2 tick

# 备用 此事件仅支持 2.6+
# on player move:
#     player don't have metadata value {@login_sign}
#     cancel event

# 玩家未登录时 不允许进行交互
on click:
    player don't have metadata value {@login_sign}
    cancel event

# 玩家未登录时 不允许聊天
on chat:
    player don't have metadata value {@login_sign}
    cancel event

# 玩家未登录时 不允许丢弃物品
on drop:
    player don't have metadata value {@login_sign}
    cancel event

# 玩家未登录时 不允许拾取物品
on pickup:
    player don't have metadata value {@login_sign}
    cancel event

# 玩家未登录时 不允许使用除登录相关的其它命令
on command:
    sender is player
    player don't have metadata value {@login_sign}
    command is not "l", "login", "reg" or "register"
    cancel event

# ---------------------------------------------------------------- #
#  ███████╗██╗   ██╗███╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗
#  ██╔════╝██║   ██║████╗  ██║╚══██╔══╝██║██╔═══██╗████╗  ██║
#  █████╗  ██║   ██║██╔██╗ ██║   ██║   ██║██║   ██║██╔██╗ ██║
#  ██╔══╝  ██║   ██║██║╚██╗██║   ██║   ██║██║   ██║██║╚██╗██║
#  ██║     ╚██████╔╝██║ ╚████║   ██║   ██║╚██████╔╝██║ ╚████║
#  ╚═╝      ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
#  函数

# 加密密码
# @param pwd 密码
# @return Hash值
function encryPassword(pwd: text) :: text:
    # 生成随机盐
    set {_uuid} to random uuid
    replace "-" with "" in {_uuid}
    set {_salt} to first 16 character of {_uuid}
    # 生成Hash
    return passwordHash({_pwd}, {_salt})

# 验证密码
# @param pwd 密码
# @param hash Hash值
# return 验证通过
function checkPassword(pwd: text, hash: text) :: boolean:
    if {_hash} starts with "$SHA$":
        set {_s::*} to subtext of {_hash} between 6 to length of {_hash} split at "$"
        size of {_s::*} is 2
        passwordHash({_pwd}, first element of {_s::*}) is {_hash}
        return true
    return false

# 通过密码和盐值 生成 Hash 值
# @param pwd 密码
# @param salt 盐
# @return Hash值
function passwordHash(pwd: text, salt: text) :: text:
    # 将两个 MD5 换成 SHA-256 就是 Authme 的默认加密算法
    set {_hash} to "%{_pwd} hash with MD5%%{_salt}%" hash with MD5
    return "$SHA$%{_salt}%$%{_hash}%"
`

const codeHtml = ref('')

codeHtml.value = highlight.codeToHtml(code, {
  lang: 'Skript',
  theme: 'github-dark-default'
})

</script>

<template>
  <div class="container">
    <pre>
      <code v-html="codeHtml"></code>
    </pre>
  </div>
</template>

<style scoped>
.container {
  background-color: #0d1117;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  white-space: pre;
  overflow-y: auto;
}

.main {
  flex: 1;
}
</style>

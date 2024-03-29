/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "Auto bolt.": "自动螺栓。",
    "Automate": "自动化",
    "Automate your metal detector": "自动化您的金属探测器",
    "Automatically dig for scraps": "自动挖掘废料",
    "Automatically plunder copper": "自动搜刮铜",
    "Automatically recycle stuff": "自动回收物品",
    "Bolt conversion rate. Currently 1.00 Lightning to 1.00 Bolts": "螺栓转换率。 目前 1.00 闪电到 1.00 螺栓",
    "Cast your bolts on the ground to find rewards!": "把你的螺栓放在地上寻找奖励！",
    "Convert 1.00 Lightning to 1.00 Bolts": "将 1.00 闪电转换为 1.00 螺栓",
    "Copper value": "铜数量",
    "Dig value": "挖掘数量",
    "Farida Wulandari": "法里达·乌兰达里",
    "I doubt it will be strong enough once we repair it with some Scrap metal.": "我怀疑一旦我们用一些废金属修复它，它是否会足够坚固。",
    "IshaD": "伊沙德",
    "Maybe you can go far enough to gain more materials?": "也许你可以走得足够远以获得更多的材料？",
    "Metal detector value": "金属探测器数量",
    "Progress bar example by": "进度条示例",
    "Reach 10000 Scrap to": "达到 10000 废料以",
    "Recycle value": "回收数量",
    "Scrap": "废料",
    "Speedup all actions": "加速所有动作",
    "Thank you for playing my game. I hope you enjoyed it.": "谢谢你玩我的游戏。 我希望你喜欢它。",
    "Tile regen time. Tiles are regenerating every 3.00 seconds": "瓷砖再生时间。 瓷砖每 3.00 秒重新生成一次",
    "Time travel": "时间旅行",
    "Time Travel": "时间旅行",
    "To properly fix it, you need to travel all the way back to the past.": "要正确修复它，您需要一路回到过去。",
    "Uh Oh. Your time machine has broken down.": "哦哦。 你的时光机坏了。",
    "You have recovered the Flux Capacitor, your time machine is fully repaired.": "您已经恢复了磁通电容器，您的时间机器已完全修复。",
    "Created by": "作者是",
    "MAX": "最大",
    "Gasoline": "汽油",
    "Increase action speed": "提高动作速度",
    "Increase oil value": "提高石油数量",
    "None": "无",
    "Oil to Gasoline": "石油到汽油",
    "Unlock Greasing": "解锁润滑脂",
    "Upgrade": "升级",
    "Complete the game": "完成游戏",
    "Lightning": "闪电",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Currently ": "当前 ",
    "Dig for scraps (": "挖掘废料（",
    "Metal detector (": "金属探测器 （",
    "Recycle stuff (": "回收物品（",
    "Plunder copper  (": "搜刮铜（",
    "Level ": "等级 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^([\d\.]+) \(\+([\d\.]+)\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\+([\d\.,]+)\)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^Oil. You have (.+)$/, '石油。你有 $1'],
    [/^Convert (.+) Oil to (.+) Gasoline$/, '转换 $1 石油 为 $2 汽油。'],
    [/^Convert (.+) oil to (.+) gasoline$/, '转换 $1 石油 为 $2 汽油。'],
    [/^Convert (.+) Lightning to (.+) Bolts$/, '转换 $1 闪电 为 $2 螺栓。'],
    [/^Scrap Machine (.+) Scrap$/, '废料机器 $1 废料。'],
    [/^Bolt conversion rate. Currently (.+) Lightning to (.+) Bolts$/, '螺栓转换率。 当前 $1 闪电到 $2 螺栓'],
    [/^Lightning Rod. Your (.+) rods are generating (.+) Lightning\/s$/, '避雷针。 你的 $1 避雷针产生 $2 闪电\/秒'],
    [/^Tile regen time. Tiles are regenerating every 1.69 seconds$/, '瓷砖再生时间。 瓷砖每 $1 秒重新生成一次'],
    [/^Auto bolt. (.+) times every (.+) seconds$/, '自动螺栓。 每 $1 秒 $2 次'],
    [/^You have (.+) oil.$/, '你有 $1 石油。'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^\-([\d\.]+) oil\/s$/, '\-$1 石油\/秒'],
	[/^([\d\.]+) oil\/s$/, '$1 石油\/秒'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^Dig randomly (.+) Oil$/, '随机挖掘 $1 石油'],
    [/^Purify the Ocean again (.+) Oil$/, '再次净化海洋 $1 石油'],
    [/^Purify the Ocean (.+) Oil$/, '净化海洋 $1 石油'],
    [/^Oil Drill (.+) Oil$/, '石油钻机 $1 石油'],
    [/^Drilling Platform (.+) Oil$/, '钻井平台 $1 石油'],
    [/^([\d\.]+) Scrap$/, '$1 废料'],
    [/^(.+) Oil, (.+) Gasoline$/, '$1 石油，$2 汽油'],
    [/^(.+) Lighting, (.+) Bolts$/, '$1 闪电，$2 螺栓'],
    [/^(.+) Oil$/, '$1 石油'],
    [/^Oil to Gasoline$/, '石油 到 汽油'],
    [/^(.+) Gasoline$/, '$1 汽油'],
    [/^([\d\.]+) Lightning, ([\d\.]+) Bolts$/, '$1 闪电，$2 螺栓'],
    [/^([\d\.]+) Oil, ([\d\.]+) Gasoline$/, '$1 石油，$2 汽油'],
    [/^([\d\.,]+)([\d\.]+) Scrap$/, '$1e$2 废料'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);
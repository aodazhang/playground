// 背景
const backgrounds = [
  {
    name: 'bg',
    targetContainer: 'background',
    x: 0,
    y: 0
  }
]

// 场景1
const scene1s = [
  {
    name: 'p1-bg',
    targetContainer: 'scene/scene1',
    x: 0,
    y: 0
  },
  {
    name: 'p1-cloud1',
    targetContainer: 'scene/scene1',
    x: -20,
    y: 177
  },
  {
    name: 'p1-cloud2',
    targetContainer: 'scene/scene1',
    x: 725,
    y: 0
  },
  {
    name: 'p1-grass2',
    targetContainer: 'scene/scene1',
    x: 836,
    y: 1161
  },
  {
    name: 'p1-grass1',
    targetContainer: 'scene/scene1',
    x: 0,
    y: 1093
  },
  {
    name: 'p1-house',
    targetContainer: 'scene/scene1',
    x: 732,
    y: 0
  },
  {
    name: 'p1-p1',
    targetContainer: 'scene/scene1',
    x: 996,
    y: 600
  },
  {
    name: 'p1-star',
    targetContainer: 'scene/scene1',
    alpha: 0, // 星星初始隐藏
    x: 424,
    y: 419
  },
  {
    name: 'p1-tree',
    targetContainer: 'scene/scene1',
    x: -20,
    y: 604
  }
]

// 场景2
const scene2s = [
  {
    name: 'p2-school',
    targetContainer: 'scene/scene2',
    x: 613,
    y: 31
  },
  {
    name: 'p2-boy',
    targetContainer: 'scene/scene2',
    x: 1508,
    y: 412
  },
  {
    name: 'p2-huati',
    targetContainer: 'scene/scene2',
    x: 1298,
    y: 414
  },
  {
    name: 'p2-lotsofyinfu',
    targetContainer: 'scene/scene2',
    x: 1932,
    y: 307
  },
  {
    name: 'p2-1',
    targetContainer: 'scene/scene2',
    x: 816,
    y: 0
  },
  {
    name: 'p2-mother',
    targetContainer: 'scene/scene2',
    x: 144,
    y: 768
  },
  {
    name: 'p2-shitou',
    targetContainer: 'scene/scene2',
    x: 1200,
    y: 1149
  },
  {
    name: 'p2-tree4',
    targetContainer: 'scene/scene2',
    x: 1932,
    y: 49
  },
  {
    name: 'p2-wutai',
    targetContainer: 'scene/scene2',
    x: 2243,
    y: 349
  },
  {
    name: 'p2-yinfu',
    targetContainer: 'scene/scene2',
    x: 3009,
    y: 273
  },
  {
    name: 'w1',
    targetContainer: 'scene/scene2',
    x: 0,
    y: 0
  }
]

// 场景3
const scene3s = [
  {
    name: 'p3-2',
    targetContainer: 'scene/scene3',
    x: 826,
    y: 142
  },
  {
    name: 'p3-1',
    targetContainer: 'scene/scene3',
    alpha: 0, // 工作中人物初始隐藏
    x: 0,
    y: 80
  },
  {
    name: 'p3-3',
    targetContainer: 'scene/scene3',
    x: 971,
    y: 24
  },
  {
    name: 'p3-childbirth',
    targetContainer: 'scene/scene3',
    x: 2397,
    y: 453
  }
]

// 场景4
const scene4s = [
  {
    name: 'p4-1',
    targetContainer: 'scene/scene4',
    x: 691,
    y: 529
  },
  {
    name: 'p4-bg',
    targetContainer: 'scene/scene4',
    x: 588,
    y: 0
  },
  {
    name: 'p4-house3',
    targetContainer: 'scene/scene4',
    x: 0,
    y: 0
  },
  {
    name: 'p4-start',
    targetContainer: 'scene/scene4',
    x: 1398,
    y: 0
  }
]

// 结束
const ends = [
  {
    name: 'x1',
    targetContainer: 'end',
    alpha: 0, // 结束序列初始隐藏
    x: 0,
    y: 0
  }
]

export default [
  ...backgrounds,
  ...scene1s,
  ...scene2s,
  ...scene3s,
  ...scene4s,
  ...ends
]

export type CursorItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  previewImage: string; // PNG 用于网站预览
  cursorUrl: string; // .cur 用于下载（后面换成真实路径）
};

export const cursors: CursorItem[] = [
  {
    id: 1,
    name: "暹罗猫咪指针",
    category: "猫咪系",
    description: "优雅又慵懒的暹罗猫，好喜欢它蓝蓝的大眼睛～",
    previewImage: "/cursors/siamese-cat.png",
    cursorUrl: "/cursors/siamese-cat.cur",
  },
  {
    id: 2,
    name: "粉色小兔子",
    category: "动物系",
    description: "软萌的粉兔，耳朵像棉花糖一样轻盈可爱。",
    previewImage: "/cursors/pink-rabbit.png",
    cursorUrl: "/cursors/pink-rabbit.cur",
  },
  {
    id: 3,
    name: "草莓牛奶",
    category: "食物系",
    description: "甜甜的草莓牛奶风格，治愈感拉满！",
    previewImage: "/cursors/strawberry-milk.png",
    cursorUrl: "/cursors/strawberry-milk.cur",
  },
  {
    id: 4,
    name: "薄荷小熊",
    category: "动物系",
    description: "清新薄荷配色的小熊，软软糯糯超耐看。",
    previewImage: "/cursors/mint-bear.png",
    cursorUrl: "/cursors/mint-bear.cur",
  },
  {
    id: 5,
    name: "云朵独角兽",
    category: "梦幻系",
    description: "会发光的小独角兽，像在云朵里蹦跳。",
    previewImage: "/cursors/cloud-unicorn.png",
    cursorUrl: "/cursors/cloud-unicorn.cur",
  },
  {
    id: 6,
    name: "蓝莓星星",
    category: "星空系",
    description: "蓝莓奶霜色小星星，点击时心情会变好。",
    previewImage: "/cursors/blueberry-star.png",
    cursorUrl: "/cursors/blueberry-star.cur",
  },
  {
    id: 7,
    name: "樱花蝴蝶结",
    category: "少女系",
    description: "樱花粉蝴蝶结，甜美又温柔的经典款。",
    previewImage: "/cursors/sakura-bow.png",
    cursorUrl: "/cursors/sakura-bow.cur",
  },
  {
    id: 8,
    name: "奶油布丁",
    category: "食物系",
    description: "焦糖布丁质感，圆润软萌、甜度刚刚好。",
    previewImage: "/cursors/cream-pudding.png",
    cursorUrl: "/cursors/cream-pudding.cur",
  },
  {
    id: 9,
    name: "睡衣柴犬",
    category: "动物系",
    description: "穿着睡衣的柴犬指针，慵懒可爱一整天。",
    previewImage: "/cursors/pajama-shiba.png",
    cursorUrl: "/cursors/pajama-shiba.cur",
  },
];

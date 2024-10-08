/**
 * ht.DataModel 的扩展方法
 */
import { evaluate } from 'mathjs';
import type { FormulaTagValue, NodeTagValue } from '@/types/diagram/data-model';

/**
 * 根据数据对图元/组件进行颜色、状态改变
 * @param dm DataModel
 * @param list - 传入的数据
 */
export const setNodeStatusByValue = (dm: ht.DataModel, list: NodeTagValue[]) => {
  list.forEach(item => {
    let node = getDataByNodeTag(dm, item.tag);
    let value = item.value;
    if (value === 'null') return;
    node.forEach(function (node: ht.Node) {
      if (item.tag === node.a('node.tag.cb')) {
        value = Boolean(Number(value));
        if (node.a('node.tag.reverse'))
          value = !value;
        node.a('node.state', value);
      } else if (item.tag === node.a('node.tag.sw')) {
        value = Boolean(Number(value));
        if (node.a('node.tag.reverse')) value = !value;
        node.a('node.switch', value);
      } else if (item.tag === node.a('node.tag.ddfk')) {
        value = Boolean(Number(value));
        if (node.a('node.tag.reverse')) value = !value;
        node.a('node.state', value);
      } else if (item.tag === node.a('node.tag.ddfg')) {
        value = Boolean(Number(value));
        if (node.a('node.tag.reverse')) value = !value;
        node.a('node.switch', value);
      } else {
        if (node.a('node.cate') === 'm-point') {
          if (node.a('node.type') === 'data') {
            const valueArr = node.a('node.label').split('.');
            const decLen = valueArr[1] ? valueArr[1].length : 0;
            node.a('node.label', Number(value).toFixed(decLen));
            return;
          }
          if (node.a('node.type') === 'switch') {
            value = Boolean(Number(value));
            if (node.a('node.tag.reverse')) value = !value;
            node.a('node.state', value);
          }
          if (node.a('node.type') === 'signalBoard') {
            value = Boolean(Number(value));
            if (node.a('node.tag.reverse')) value = !value;
            node.a('node.state', value);
          }
          if (node.a('node.type') === 'signal-DIY') {
            value = Boolean(Number(value));
            if (node.a('node.tag.reverse')) value = !value;
            node.a('node.state', value);
          }
          // if (node.a('node.type') === 'switch-cb') {
          //     node.a('node.state', Boolean(Number(item.value)));
          // }
          if (node.a('node.type') === 'motor' ||
            node.a('node.type') === 'value' ||
            node.a('node.type') === 'pump' ||
            node.a('node.type') === 'equip') {
            if (item.value === 'null') return;
            let va = Number(item.value).toString(2).split('').map(i => Number(i));
            va = va.reverse().concat(new Array(32 - va.length).fill(0));
            node.a('node.data', va);
          }
          if (node.a('node.type') === 'm-state' || node.a('node.type') === 'text-DIY' || node.a('node.type') === 'text_DIY_choose') {
            node.a('node.state', Number(item.value));
          }
          if (node.a('node.type') === 'p-bar') {
            node.a('node.value', Number(item.value));
          }
        }
        // 如果是 Text
        // @ts-ignore
        if (node instanceof ht.Text) {
          if (node.a('node.rate') !== undefined && !isNaN(Number(node.a('node.rate')))) {
            value = Number(item.value) * Number(node.a('node.rate'));
          } else {
            value = Number(item.value);
          }
          let decimal = 2;
          if (!isNaN(Number(node.a('text.decimal')))) {
            decimal = Number(node.a('text.decimal'));
          }
          node.s('text', value.toFixed(decimal));
        }
      }
    });
  });
};

/**
 * 重写的 getNodeByTag 方法，使用 'node.tag' 属性以及自带 tag 来查找组件。
 * @param dm DataModel
 * @param tag - 进行匹配的 tag
 */
export const getDataByNodeTag = (dm: ht.DataModel, tag: string): ht.Node[] => {
  let nodes: ht.Node[] = [];
  dm.each((node: ht.Node) => {
    if ((node.a('node.name') === 'switch-cb-equip' || node.a('node.name') === 'switch-cb')
      && (node.a('node.tag.cb') === tag || node.a('node.tag.sw') === tag)) {
      nodes.push(node);
    } else if (node.a('node.tag.ddfk') === tag || node.a('node.tag.ddfg') === tag) {
      nodes.push(node);
    } else if (node.a('node.tag') === tag) nodes.push(node);
    else {
    }
  });
  return nodes;
};

/**
 * 获取 DataModel 中所有含有 node.tag 属性的组件。
 * @param dm DataModel
 * @param deduplicate - 判断是否去重，flag 为 true 则去重，默认为 false。
 */
export const getOriginNode = (dm: ht.DataModel, deduplicate: boolean = false): ht.Node[] => {
  let nodes: ht.Node[] = [], tagArr: string[] = [];
  dm.each((item: ht.Node) => {
    if (deduplicate) {
      if (item.a('node.tag') && tagArr.indexOf(item.a('node.tag')) < 0) {
        nodes.push(item);
        tagArr.push(item.a('node.tag'));
      }
    } else if (item.a('node.tag')) nodes.push(item);
  });
  return nodes;
};

/**
 * (Old)
 * @param dm DataModel
 * 获取 DataModel 中所有 tag(不重复)
 */
export const getNodeTags = (dm: ht.DataModel): string[] => {
  let nodeArr: string[] = [];
  dm.each((data: ht.Node) => {
    if (data.a('node.tag.sw') || data.a('node.tag.cb')) {
      let tagSC = data.a('node.tag.sw');
      let tagDLQ = data.a('node.tag.cb');
      if (tagSC && nodeArr.indexOf(tagSC) < 0) {
        nodeArr.push(tagSC);
      }
      if (tagDLQ && nodeArr.indexOf(tagDLQ) < 0) {
        nodeArr.push(tagDLQ);
      }
    } else if (data.a('node.tag.ddfk') || data.a('node.tag.ddfg')) {
      let tagSC = data.a('node.tag.ddfk');
      let tagDLQ = data.a('node.tag.ddfg');
      if (tagSC && nodeArr.indexOf(tagSC) < 0) {
        nodeArr.push(tagSC);
      }
      if (tagDLQ && nodeArr.indexOf(tagDLQ) < 0) {
        nodeArr.push(tagDLQ);
      }
    } else {
      let tag = data.a('node.tag');
      if (tag && nodeArr.indexOf(tag) < 0) {
        nodeArr.push(tag);
      }
    }
  });
  return nodeArr;
};

/**
 * 针对图元/组件中包含公式（node.formula) 属性进行的预处理
 * 将 node 中的公式进行计算之后，虚拟一个 fakeTag 添加到含有公式的组件/图元的 node.tag 属性中，
 * 并以 {nodeTag: fakeTag, nodeDesc: formulaText, value: calResult} 的形式添加数据集中，
 * 以供 setNodeStatusByValue() 使用
 * @param dm DataModel
 * @param json 获取到的数据集
 * @param reg 进行匹配的正则表达式
 */
export const formulaPreprocess = (
  dm: ht.DataModel,
  json: NodeTagValue[],
  reg: RegExp = /["'“”‘’][a-zA-Z0-9:_-]+["'“”‘’]/g,
): (NodeTagValue | FormulaTagValue)[] => {
  let formulaNodeArr: ht.Node[] = [],
    resultArr: FormulaTagValue[] = [];
  dm.each((node: ht.Node) => {
    if (node.a('node.formula'))
      formulaNodeArr.push(node);
  });
  formulaNodeArr.forEach((node: ht.Node) => {
    let formulaText: string = node.a('node.formula'),
      result = 0;
    try {
      let formulaFinal = formulaText.replace(reg, (match) => {
        let matchNoQM = match.replace(/["'“”‘’]/g, '');
        let node = json.find(item => item.tag === matchNoQM);
        return String(node!.value);
      });
      result = evaluate(formulaFinal).toFixed(2);
    } catch (err) {
      console.error(`${formulaText} 公式解析错误`);
    }
    let fakeTag = 'NT-' + nanoid(8);
    node.a('node.tag', fakeTag);
    resultArr.push({
      tag: fakeTag,
      value: result,
      nodeDesc: formulaText,
      timestamp: json[0].timestamp ?? '',
    });
  });
  json = json.concat(resultArr);
  return json;
};

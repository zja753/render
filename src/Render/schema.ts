import type { Schema } from 'render';
const schema: Schema = {
  elements: [
    {
      id: 'root',
      type: 'Container',
      props: {
        style: {
          width: '600px',
          height: '600px',
          border: '1px solid #000',
          display: 'flex',
        },
      },
    },
    {
      id: 'child1',
      type: 'Container',
      props: {
        style: {
          width: '50%',
          height: '50%',
          border: '1px solid #000',
        },
      },
    },
    {
      id: 'child2',
      type: 'Container',
      props: {
        style: {
          width: '50%',
          height: '50%',
          border: '1px solid #000',
        },
      },
    },
    {
      id: 'btn1',
      type: 'Button',
      props: {
        text: {
          $$__type: 'subscription',
          $$__body: {
            mode: 'expression',
            expression: '{{btnTitle}}',
          },
        },
        onClick: {
          $$__type: 'Builtin.Function',
          $$__body: {
            mode: 'function',
            code: `
              VariableManager.mergeData('cardInfo', {content: '变了变了'})
            `,
          },
        },
      },
    },
    {
      id: 'text1',
      type: 'Text',
      props: {
        text: {
          $$__type: 'subscription',
          $$__body: {
            mode: 'expression',
            expression: '这是卡片内容：{{cardInfo.content}}',
          },
        },
      },
      lifeCycle: {
        onMounted: {
          $$__type: 'Builtin.Function',
          $$__body: {
            mode: 'function',
            code: `
              VariableManager.mergeData('cardInfo', {content: 'onMounted 初始化函数执行，我是 text1'})
            `,
          },
        },
      },
    },
  ],
  layout: {
    root: 'root',
    structures: {
      root: {
        children: ['child1', 'child2'],
      },
      child1: {
        children: ['btn1'],
      },
      child2: {
        children: ['text1'],
      },
    },
  },
  managedVariables: [
    {
      name: 'btnTitle',
      type: 'String',
      defaultValue: '按钮btnTitle',
    },
    {
      name: 'cardInfo',
      type: 'Object',
      children: [
        {
          name: 'title',
          type: 'String',
        },
        {
          name: 'content',
          type: 'String',
        },
        {
          name: 'images',
          type: 'Array',
          item: {
            type: 'String',
          },
        },
      ],
      defaultValue:
        '{"title":"卡片标题","content":"卡片内容...卡片内容...卡片内容...卡片内容...","images":["https://media.istockphoto.com/id/1457593188/photo/sunny-autumn-day-at-beautiful-mountain-lake.jpg?b=1&s=170667a&w=0&k=20&c=_QGiA5ue6W1vSPLP6ZrAkliVUcwWGqin5-s0TsEaiyo=","https://media.istockphoto.com/id/503804250/photo/horses-grazing-the-grass-on-a-foggy-morning.jpg?b=1&s=170667a&w=0&k=20&c=dh1EX5sgcmjwDLD8WsIpxk_ZBo549UQ6ITWVUU26tGo="]}',
    },
  ],
};

export default schema;

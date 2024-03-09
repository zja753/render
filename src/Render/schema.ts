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
        text: '按钮1',
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
      defaultValue: '按钮',
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

/** 一个计算器的样式（来自chatGPT3.5） */
export const testSchema = {
  elements: [
    {
      id: 'root',
      type: 'Container',
      props: {
        style: {
          width: '300px',
          height: '400px',
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    {
      id: 'display',
      type: 'Text',
      props: {
        text: '0',
        style: {
          width: '90%',
          height: '20%',
          border: '1px solid #000',
          textAlign: 'right',
          padding: '10px',
          marginBottom: '10px',
          fontSize: '24px',
        },
      },
    },
    {
      id: 'row1',
      type: 'Container',
      props: {
        style: {
          width: '90%',
          height: '15%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        },
      },
    },
    {
      id: 'btn7',
      type: 'Button',
      props: {
        text: '7',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btn8',
      type: 'Button',
      props: {
        text: '8',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btn9',
      type: 'Button',
      props: {
        text: '9',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'row2',
      type: 'Container',
      props: {
        style: {
          width: '90%',
          height: '15%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        },
      },
    },
    {
      id: 'btn4',
      type: 'Button',
      props: {
        text: '4',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btn5',
      type: 'Button',
      props: {
        text: '5',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btn6',
      type: 'Button',
      props: {
        text: '6',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'row3',
      type: 'Container',
      props: {
        style: {
          width: '90%',
          height: '15%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        },
      },
    },
    {
      id: 'btn1',
      type: 'Button',
      props: {
        text: '1',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btn2',
      type: 'Button',
      props: {
        text: '2',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btn3',
      type: 'Button',
      props: {
        text: '3',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'row4',
      type: 'Container',
      props: {
        style: {
          width: '90%',
          height: '15%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        },
      },
    },
    {
      id: 'btn0',
      type: 'Button',
      props: {
        text: '0',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btnDot',
      type: 'Button',
      props: {
        text: '.',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
    {
      id: 'btnEqual',
      type: 'Button',
      props: {
        text: '=',
        style: {
          width: '30%',
          height: '100%',
        },
      },
    },
  ],
  layout: {
    root: 'root',
    structures: {
      root: {
        children: ['display', 'row1', 'row2', 'row3', 'row4'],
      },
      row1: {
        children: ['btn7', 'btn8', 'btn9'],
      },
      row2: {
        children: ['btn4', 'btn5', 'btn6'],
      },
      row3: {
        children: ['btn1', 'btn2', 'btn3'],
      },
      row4: {
        children: ['btn0', 'btnDot', 'btnEqual'],
      },
    },
  },
};

/** 圣杯布局（来自CharGPT3.5） */
export const testSchema2 = {
  elements: [
    {
      id: 'root',
      type: 'Container',
      props: {
        style: {
          display: 'flex',
          width: '100%',
          minHeight: '100vh',
        },
      },
    },
    {
      id: 'main',
      type: 'Container',
      props: {
        style: {
          flex: '1',
          border: '1px solid #000',
          padding: '20px',
        },
      },
    },
    {
      id: 'left',
      type: 'Container',
      props: {
        style: {
          flex: '0 0 200px',
          border: '1px solid #000',
          padding: '20px',
        },
      },
    },
    {
      id: 'right',
      type: 'Container',
      props: {
        style: {
          flex: '0 0 200px',
          border: '1px solid #000',
          padding: '20px',
        },
      },
    },
  ],
  layout: {
    root: 'root',
    structures: {
      root: {
        children: ['left', 'main', 'right'],
      },
    },
  },
};

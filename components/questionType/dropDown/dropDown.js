// components/questionType/dropDown/dropDown.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
          title:  [
            {
                id:1,
                value: '标题1',
                selectArray: [{
                    "id": "10",
                    "text": "1"
                }, {
                    "id": "21",
                    "text": "2"
                },
                {
                    "id": "12",
                    "text": "3"
                },
                ]
            },
            {
                id:2,
                value: '标题2',
                selectArray: [{
                    "id": "10",
                    "text": "1"
                }, {
                    "id": "21",
                    "text": "2"
                },
                {
                    "id": "12",
                    "text": "3"
                },
                ]
            },
            {
                id:3,
                value: '标题3',
                selectArray: [{
                    "id": "10",
                    "text": "1"
                }, {
                    "id": "21",
                    "text": "2"
                },
                {
                    "id": "12",
                    "text": "3"
                },
                ]
            }
          ],

         
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})

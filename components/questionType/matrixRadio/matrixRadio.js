// components/questionType/matrixRadio/matrixRadio.js
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
        option: [
            {
                id: 1,
                value: 'a',
                isChecked:false
            },
            {
              id: 2,
              value: 'a',
               isChecked:false
          },
          {
              id: 3,
              value: 'a',
               isChecked:false
          },
          {
              id: 4,
              value: 'a',
               isChecked:false
          },
          {
              id: 5,
              value: 'a',
               isChecked:false
          },
          {
              id: 6,
              value: 'a',
               isChecked:false
          },
          {
              id: 7,
              value: 'a',
               isChecked:false
          },
          {
              id: 8,
              value: 'a',
               isChecked:false
          },
          {
              id: 9,
              value: 'a',
               isChecked:false
          },
          {
              id: 10,
              value: 'a',
               isChecked:false
          },
        ],
      
      title: [
          {
              id:'1',
              value: 'g',
              option: [
                {
                    id: 1,
                    value: 'a',
                    isChecked:false
                },
                {
                  id: 2,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 3,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 4,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 5,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 6,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 7,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 8,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 9,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 10,
                  value: 'a',
                   isChecked:false
              },
            ],
          },
          {
            id:'2',
            value: 'g',
            option: [
                {
                    id: 1,
                    value: 'a',
                    isChecked:false
                },
                {
                  id: 2,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 3,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 4,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 5,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 6,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 7,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 8,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 9,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 10,
                  value: 'a',
                   isChecked:false
              },
            ],
        },
        {
            id:'3',
            value: 'g',
            option: [
                {
                    id: 1,
                    value: 'a',
                    isChecked:false
                },
                {
                  id: 2,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 3,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 4,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 5,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 6,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 7,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 8,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 9,
                  value: 'a',
                   isChecked:false
              },
              {
                  id: 10,
                  value: 'a',
                   isChecked:false
              },
            ],
        }
      ]

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleClick(e) {
           
           let {index,index2} = e.currentTarget.dataset
           let {title} = this.data
           let {option} = title[index]
           if(option[index2].isChecked != true)
           {
            option.forEach(v=> {
                v.isChecked =false
            })
           }
           option[index2].isChecked=!option[index2].isChecked
           this.setData({
               title
           })
           

        }
    }
})

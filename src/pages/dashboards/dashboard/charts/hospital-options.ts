export default {
  color: ['#ed5564', '#336cfb'],
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['donors 2022', 'donorss 2023']
  },
  grid: {
    left: 30,
    right: 0,
    top: 50,
    bottom: 50
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#336cfb'
        }
      },
      axisPointer: {
        label: {
          formatter: function(params) {
            return (
              'donors ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            );
          }
        }
      },
      data: [
        '2023-1',
        '2023-2',
        '2023-3',
        '2023-4',
        '2023-5',
        '2023-6',
        '2023-7',
        '2023-8',
        '2023-9',
        '2023-10',
        '2023-11',
        '2023-12'
      ]
    },
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#ed5564'
        }
      },
      axisPointer: {
        label: {
          formatter: function(params) {
            return (
              'donors ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            );
          }
        }
      },
      data: [
        '2022-1',
        '2022-2',
        '2022-3',
        '2022-4',
        '2022-5',
        '2022-6',
        '2022-7',
        '2022-8',
        '2022-9',
        '2022-10',
        '2022-11',
        '2022-12'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'patients 2018',
      type: 'line',
      xAxisIndex: 1,
      smooth: true,
      data: [159, 149, 174, 182, 219, 201, 175, 182, 119, 118, 112, 96]
    },
    {
      name: 'patients 2019',
      type: 'line',
      smooth: true,
      data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226]
    }
  ]
};

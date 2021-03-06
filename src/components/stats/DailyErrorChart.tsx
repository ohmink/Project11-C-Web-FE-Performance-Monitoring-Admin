import React, { useEffect, useRef } from 'react';
import bb, { bar } from 'billboard.js';
import 'billboard.js/dist/billboard.css';

const DailyErrorChart = ({ errorData }) => {
  const dailyErrorChartDiv = useRef(null);

  useEffect(() => {
    if (errorData) {
      const columns = [];
      const types = {};
      const groups = [];

      columns.push(errorData.dates);
      errorData.errors.forEach(error => {
        columns.push(error.value);
        types[error.name] = bar();
        groups.push(error.name);
      });

      bb.generate({
        data: {
          x: 'x',
          columns,
          types,
          groups: [groups],
        },
        axis: {
          x: {
            type: 'category',
          },
        },
        color: {
          pattern: ['#1b7df7', '#fe3632', '#51d569', '#fa8e1b', '#1bf3fa'],
        },
        bar: {
          width: 15,
        },
        bindto: dailyErrorChartDiv.current,
      });
    }
  }, [errorData]);

  return <div ref={dailyErrorChartDiv} />;
};

export default DailyErrorChart;

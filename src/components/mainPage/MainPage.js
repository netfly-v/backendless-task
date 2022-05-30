import styles from './MainPage.module.css';
import { useState } from 'react';
import { CustomChart } from '../customChart/CustomChart';

const CHART_TYPES = ['Bar', 'Doughnut', 'Line', 'Pie', 'Polar'];
const DEFAULT_LABELS = ['January', 'February', 'March', 'April', 'May', 'June'];
const DEFAULT_DATA = ['2', '10', '5', '2', '20'];

export const MainPage = () => {
  const [labels, setLabels] = useState(DEFAULT_LABELS);
  const [dataValue, setDataValue] = useState(DEFAULT_DATA);
  const [xInputValue, setXInputValue] = useState(labels.join(','));
  const [yInputValue, setYInputValue] = useState(dataValue.join(','));
  const [chartType, setChartType] = useState(CHART_TYPES[0]);

  const updateChart = (fn, value, key) => {
    if (!key || key === 'Enter') {
      fn(value.split(','));
    }
  };

  return (
    <div className={styles.mainPage}>
      <span className={styles.label}>X axis labels:</span>
      <input
        className={styles.input}
        value={xInputValue}
        onChange={({ target }) => setXInputValue(target.value.trim())}
        onBlur={() => updateChart(setLabels, xInputValue)}
        onKeyDown={({ key }) => updateChart(setLabels, xInputValue, key)}
      />
      <span className={styles.label}>Y axis values:</span>
      <input
        className={styles.input}
        value={yInputValue}
        onChange={({ target }) => {
          if (/^\d*(,?\d+,?)*$/.test(target.value)) {
            setYInputValue(target.value.trim());
          }
        }}
        onBlur={() => updateChart(setDataValue, yInputValue)}
        onKeyDown={({ key }) => updateChart(setDataValue, yInputValue, key)}
      />
      <div className={styles.chartWrapper}>
        <CustomChart labels={labels} dataValue={dataValue} chartType={chartType} />
      </div>
      <div className={styles.radioButtonsWrapper}>
        {CHART_TYPES.map(type => (
          <div className={styles.radioButton} key={type}>
            <input
              type="radio"
              value={type}
              name="chart"
              checked={chartType === type}
              onChange={({ target }) => setChartType(target.value)}
            />
            {type} Chart
          </div>
        ))}
      </div>
    </div>
  );
};

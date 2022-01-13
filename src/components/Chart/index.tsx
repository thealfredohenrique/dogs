import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";
import { IStatistics } from "../../services/statistics";
import styles from "./styles.module.css";

interface IChartProps {
  statistics: IStatistics[];
}

interface IChart {
  x: string;
  y: number;
}

const Chart = ({ statistics }: IChartProps) => {
  const [chart, setChart] = useState<IChart[]>([] as IChart[]);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const chartData = statistics.map((value) => ({
      x: value.name,
      y: value.views,
    }));

    setChart(chartData);

    setViews(statistics.map(({ views }) => views).reduce((a, b) => a + b, 0));
  }, [statistics]);

  return (
    <section className={`${styles.charts} animationFromLeft`}>
      <div className={`${styles.views} ${styles.chart}`}>
        <p>Views: {views}</p>
      </div>
      <div className={styles.chart}>
        <VictoryPie
          data={chart}
          innerRadius={50}
          padding={{ top: 20, right: 80, bottom: 20, left: 80 }}
          style={{
            data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2 },
            labels: { fill: "#333", fontSize: 14 },
          }}
        />
      </div>
      <div className={styles.chart}>
        <VictoryChart>
          <VictoryBar data={chart} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
};

export default Chart;

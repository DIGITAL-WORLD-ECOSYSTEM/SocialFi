import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = {
  chart: {
    series: {
      name: string;
      data: [number, number][];
    }[];
  };
};

export function ChartScatter({ chart }: Props) {
  const chartOptions = useChart({
    chart: { zoom: { enabled: true, type: 'xy' } },
    legend: { show: true },
    xaxis: {
      tickAmount: 8,
      labels: {
        // CORREÇÃO: Usamos Number(val) em vez de parseFloat(val)
        // Isso satisfaz o TypeScript pois Number aceita 'string | number'
        formatter: (val) => Number(val).toFixed(1),
      },
    },
    markers: { size: 6 },
  });

  return <Chart type="scatter" series={chart.series} options={chartOptions} sx={{ height: 350 }} />;
}

import * as React from "react";
import * as echarts from "echarts";


const defaultOption = {
    textStyle: { fontFamily: "IRANSANs" },
    // color: Colors,
};

interface IProps {
    height: number;
    option: any;
    showLoading?: boolean;
    onClick?: any;
    onReady?: any;
    margin: string
}

class Chart extends React.Component<IProps> {
    private chartRef: any;
    private chart: any;

    constructor(props: IProps) {
        super(props);
        this.chartRef = React.createRef();
    }

    public componentDidMount() {
        this.chart = this.renderChart();
        // elementResizeEvent(this.chartRef.current, () => {
        //     chart.resize();
        // });
        const { onReady } = this.props;
        if (typeof onReady === "function") {
            onReady(this.chart);
        }
        window.addEventListener('resize', this.updateDimensions);
    }
    updateDimensions = () => {
        this.chart.resize();
    };

    public componentDidUpdate() {
        this.renderChart();
    }

    public componentWillUnmount() {
        echarts.dispose(this.chartRef.current);
        window.removeEventListener('resize', this.updateDimensions);
    }

    public render() {
        const { height, margin } = this.props;
        return <div ref={this.chartRef} style={{ height, margin }} className="echart-wrapper mx-auto" />;
    }

    private renderChart() {
        const chartDom = this.chartRef.current;
        const chart = echarts.init(chartDom);
        const { onClick, option, showLoading } = this.props;
        if (onClick) {
            chart.off("click");
            chart.on("click", onClick);
        }
        const options = Object.assign({}, option, defaultOption);
        chart.setOption(options);
        if (showLoading) {
            chart.showLoading();
        } else {
            chart.hideLoading();
        }
        chart.resize();
        return chart;
    }
}

export default Chart;

import '../styles/Metric.css';
import { BsPerson, BsPeople, BsSoundwave } from 'react-icons/bs';
import { MdOutlineWaterDrop, MdOutlineAir } from 'react-icons/md';
import { TbTemperature } from 'react-icons/tb';

const components = {BsPerson, BsPeople, BsSoundwave, MdOutlineWaterDrop, MdOutlineAir, TbTemperature};

const Metric = (props) => {
    const Logo = components[props.logo];
    return (
        <div className="metric-container">
            <div className="metric-sub-container">
                <div className="logo-container">
                    <Logo />
                </div>
                <div className="metric-value">{props.value}</div>
                <div>{props.name}</div>
            </div>
        </div>
    )
}


export default Metric;
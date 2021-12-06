import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';
import millify from 'millify';

import { useGetCryptosQuery } from '../services/cryptoAPI';
import { Cryptocurrencies, News, Loader } from './index';

const { Title } = Typography;

const Home = () => {
    const { data, isFetching, error } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return <Loader />;

    if (error && Object.keys(error).length > 0) {
        return <p>Error loading data. Try again.</p>;
    }

    return (
        <Fragment>
            <Title level={12} className="heading">
                Global crypto stats
            </Title>

            <Row>
                <Col span={12}>
                    <Statistic
                        title="Total Cryptocurrencies"
                        value={globalStats?.total}
                    />
                    <Statistic
                        title="Total Exchanges"
                        value={millify(globalStats?.totalExchanges)}
                    />
                    <Statistic
                        title="Total Market Cap"
                        value={millify(globalStats?.totalMarketCap)}
                    />
                    <Statistic
                        title="Total 24h Volume"
                        value={millify(globalStats?.total24hVolume)}
                    />
                    <Statistic
                        title="Total MArkets"
                        value={millify(globalStats?.totalMarkets)}
                    />
                </Col>
            </Row>

            <div className="home-heading-container">
                <Title className="home-title" level={2}>
                    Top 10 Cryptocurrencies in the world
                </Title>
                <Title className="show-more" level={3}>
                    <Link to="/cryptocurrencies">Show more</Link>
                </Title>
            </div>

            <Cryptocurrencies simplified />

            <div className="home-heading-container">
                <Title className="home-title" level={2}>
                    Latest Crypto News
                </Title>
                <Title className="show-more" level={3}>
                    <Link to="/news">Show more</Link>
                </Title>
            </div>

            <News simplified />
        </Fragment>
    );
};

export default Home;

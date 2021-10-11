import React, { Fragment, useState, useEffect } from 'react';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

import { Loader } from './index';
import { useGetExchangesQuery } from '../services/cryptoAPI';

const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {
    const [exchangesList, setExchangesList] = useState([]);

    const { data, isFetching } = useGetExchangesQuery();

    useEffect(() => {
        setExchangesList(data?.data?.exchanges || []);
    }, [data]);

    if (isFetching) return <Loader />;

    return (
        <Fragment>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>

            <Row>
                {exchangesList.map(exchange => (
                    <Col span={24} key={exchange.id}>
                        <Collapse>
                            <Panel
                                showArrow={false}
                                key={exchange.id}
                                header={
                                    <Row>
                                        <Col span={6}>
                                            <Text>
                                                <strong>
                                                    {exchange.rank}.
                                                </strong>
                                            </Text>
                                            <Avatar
                                                className="exchange-image"
                                                src={exchange.iconUrl}
                                            />
                                            <Text>
                                                <strong>{exchange.name}</strong>
                                            </Text>
                                        </Col>
                                        <Col span={6}>
                                            $ {millify(exchange.volume)}
                                        </Col>
                                        <Col span={6}>
                                            {millify(exchange.numberOfMarkets)}
                                        </Col>
                                        <Col span={6}>
                                            {millify(exchange.marketShare)}%
                                        </Col>
                                    </Row>
                                }
                            >
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};

export default Exchanges;

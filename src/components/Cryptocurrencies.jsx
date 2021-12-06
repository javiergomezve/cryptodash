import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd';

import { Loader } from './index';
import { useGetCryptosQuery } from '../services/cryptoAPI';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching, error } = useGetCryptosQuery(count);

    const [cryptos, setCryptos] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
    }, [cryptosList]);

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCryptos(filteredData);
    }, [searchTerm]);

    if (isFetching) return <Loader />;

    if (error && Object.keys(error).length > 0) {
        return <p>Error loading data. Try again.</p>;
    }

    return (
        <Fragment>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search cryptocurrency"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map(currency => (
                    <Col
                        key={currency.id}
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                    >
                        <Link to={`/cryptocurrencies/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={
                                    <img
                                        className="crypto-image"
                                        src={currency.iconUrl}
                                        alt={currency.name}
                                    />
                                }
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};

export default Cryptocurrencies;

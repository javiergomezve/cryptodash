import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { Loader } from './index';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoAPI';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
    'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
    const [news, setNews] = useState([]);

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const {
        data: cryptoNews,
        isFetching,
        error,
    } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12,
    });

    const { data } = useGetCryptosQuery(100);

    useEffect(() => {
        setNews(cryptoNews?.value || []);
    }, [cryptoNews]);

    if (isFetching) return <Loader />;

    if (error && Object.keys(error).length > 0) {
        return <p>Error loading data. Try again.</p>;
    }

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={value => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase() >= 0)
                        }
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map(coin => (
                            <Option key={coin.name} value={coin.name}>
                                {coin.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}

            {news.map((item, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className="news-card">
                        <a href={item.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {item.name}
                                </Title>
                                <img
                                    style={{
                                        maxWidth: '200px',
                                        maxHeight: '100px',
                                    }}
                                    src={
                                        item?.image?.thumbnail?.contentUrl ||
                                        demoImage
                                    }
                                    alt={item.name}
                                />
                            </div>

                            <p>
                                {item.description > 100
                                    ? `${item.description.substring(0, 100)}...`
                                    : item.description}
                            </p>

                            <div className="provider-container">
                                <div>
                                    <Avatar
                                        src={
                                            item.provider[0]?.image?.thumbnail
                                                ?.contentUrl || demoImage
                                        }
                                        alt={item.provider[0]?.name}
                                    />
                                    <Text className="provider-name">
                                        {item.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text>
                                    {moment(item.datePublished)
                                        .startOf('ss')
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;

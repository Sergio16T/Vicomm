import React from 'react';
import Link from 'next/link';
import Pagination from './Pagination';
import StyledTable from '../Styles/ProductTableStyles';

const ProductTable = ({ count, fetchMore, loading, productItems }) => {
    return (
        <StyledTable rowCount={productItems ? productItems.length : 0} numberPerPage={10}>
            <div className="table">
                <div className='table-header'>
                    <div className="header-col w-50">
                    </div>
                    <div className="header-col table-col-400">
                        Name
                    </div>
                    <div className="header-col px-2 w-80">
                        Price
                    </div>
                    <div className="header-col px-2 w-120">
                        Sale Price
                    </div>
                    <div className="header-col px-2 w-80">
                        Weight
                    </div>
                </div>
                <div className="table-body">
                    {!loading && productItems ? productItems.map(item => {
                        return (
                            <Link href={`/product/detail?uid=${item.item_uid}`} key={item.id}>
                                <div className="table-row" >
                                    <div className="w-50 d-flex justify-content-center">
                                        <div className="table-img">
                                            {item.mltmd_url ?
                                                <img src={item.mltmd_url} alt="product image"/>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div className="table-col-400">
                                        {item.item_title}
                                    </div>
                                    <div className="d-flex px-2 w-80">
                                        {item.price}
                                    </div>
                                    <div className="d-flex px-2 w-120">
                                        {item.sale_price}
                                    </div>
                                    <div className="d-flex px-2 w-80">
                                        {item.item_weight ? `${item.item_weight} ${item.item_weight === 1 ? 'lb' : 'lbs'}` : ''}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                        : null
                    }
                </div>
                <div className="table-footer">
                    {!loading &&
                        <Pagination
                            basepath="/products"
                            numberPerPage={10}
                            count={count}
                            fetchMore={fetchMore}
                        />
                    }
                </div>
            </div>
        </StyledTable>
    );
};

export default ProductTable;
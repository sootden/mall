import React from 'react';

const PageComponent = ({serverDate, movePage}) => {
    return (
        <div className="m-6 flex justify-center">
            {serverDate.prev ? <div className="m-2 p-2 w-16 text-center font-bold text-blue-400" onClick={()=>movePage({page:serverDate.prevPage})}>Prev</div> : <></> }
            {serverDate.pageNumList.map(pageNum =>
                <div key={pageNum} className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${serverDate.current === pageNum ? 'bg-gray-500 ' : 'bg-blue-400'}`}
                     onClick={() => movePage({page:pageNum})}>
                    {pageNum}
                </div>
            )}

            {serverDate.next ? <div className="m-2 p-2 w-16 text-center font-bold text-blue-400" onClick={() => movePage({page:serverDate.nextPage})}>Next</div> : <></>}
        </div>
    );
};

export default PageComponent;
import React from 'react';

export default function PaginationLinks({ meta, onPageClick }) {
    function onClick(e, link) {
        e.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link);
    }

    return (
        <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4'>
            <div className='flex flex-col m-auto sm:flex-row sm:flex-1 sm:items-center sm:justify-between'>
                <div className='self-center mb-2 sm:mb-0'>
                    <p className='text-sm text-gray-700'>
                        Showing <span className='font-medium'>{meta.from}</span> to{' '}
                        <span className='font-medium'>{meta.to}</span> of &nbsp;
                        <span className='font-medium'>{meta.total}</span> results
                    </p>
                </div>
                <div>
                    {meta.total > meta.per_page && (
                        <nav
                            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                            aria-label='Pagination'
                        >
                            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                            {meta.links &&
                                meta.links.map((link, ind) => (
                                    <a
                                        href='#'
                                        onClick={(e) => onClick(e, link)}
                                        key={ind}
                                        aria-current='page'
                                        className={
                                            `relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50 ` +
                                            (ind === 0 ? 'rounded-l-md ' : '') +
                                            (ind === meta.links.length - 1 ? 'rounded-r-md ' : '') +
                                            (link.active ? 'e bg-indigo-50 text-indigo-600 ' : '') +
                                            (!link.url ? 'disabled' : '')
                                        }
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        disabled={!link.url}
                                    ></a>
                                ))}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}

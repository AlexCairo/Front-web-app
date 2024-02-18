const Pagination = ({productosPorPagina, paginaActual, setPaginaActual, totalProductos}) => {
    
    let pages = [];
    for(let i = 1; i<=Math.ceil(totalProductos/productosPorPagina); i++){
        pages.push(i);
    }

    return(
        <div className="pagination">
            {
                pages.map((page,index) => {
                    return <button 
                            className={`${page === paginaActual ? "active" : ""}`}
                            onClick={() => setPaginaActual(page)}
                            key={index}
                            >
                                {page}
                            </button>
                })
            }
        </div>
    );
}

export default Pagination;
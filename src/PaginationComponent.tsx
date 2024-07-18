import React from "react";
import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

interface PaginationProps{
    currentPage: number;
    prevPage: ()=> void;
    nextPage: ()=> void;
    pageNumbers: number[];
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;

}
const PaginationComponent:React.FC<PaginationProps> = ({currentPage, prevPage, nextPage, pageNumbers, setCurrentPage, totalPages}) => {

    return (
        <Container>
            <Pagination>
                <PaginationItem>
                    <PaginationLink previous onClick={prevPage} disabled={currentPage === 1} />
                </PaginationItem>
                {pageNumbers.map((number) => (
                    <PaginationItem key={number} active={currentPage === number} >
                        <PaginationLink onClick={() => setCurrentPage(number)} >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationLink next onClick={nextPage} disabled={currentPage === totalPages} />
                </PaginationItem>
            </Pagination>
        </Container>

    )
}

export default PaginationComponent;
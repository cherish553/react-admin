import { useState, useEffect } from 'react'
interface Pagination {
    page: number
    total: number
}
export const useTableHook = <K, T = any>(GetDataList: Function, serachForm?: T) => {
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
    });
    useEffect(() => {
        getDataList();
    }, []);
    const [dataList, setDataList] = useState<Array<K> | []>([]);
    async function getDataList(flag?: Boolean) {
        if (flag) setPagination({ ...pagination, page: 1 });
        const data = await GetDataList(serachForm);
        if (Array.isArray(data)) {
            setDataList(data)
            return
        }
        const { data: dataList, current_page, total } = data;
        setDataList(dataList)
        setPagination({
            page: current_page,
            total,
        });
    }
    let tuple: [Array<K> | [], Pagination, React.Dispatch<React.SetStateAction<Pagination>>, Function]
    tuple = [dataList, pagination, setPagination, getDataList]
    return tuple
}
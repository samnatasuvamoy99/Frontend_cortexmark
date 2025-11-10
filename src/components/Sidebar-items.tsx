import type { ReactElement } from "react"
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setFilter } from "../Store/slices/filterSlice";
import type { FilterType } from "../Store/slices/filterSlice";

interface SiderbarItemProps {
    text: string;
    icon: ReactElement;
    filterType: FilterType;
}

export function SiderbarItem({ text, icon, filterType }: SiderbarItemProps) {
    const dispatch = useAppDispatch();
    const activeFilter = useAppSelector(state => state.filter.activeFilter);

    const isActive = activeFilter === filterType;

    const handleClick = () => {
        dispatch(setFilter(filterType));
    };

    return <div
        className={`flex text-gray-500 cursor-pointer hover:bg-gray-200 rounded 
        w-48 pl-3 hover:text-purple-600 transition-all duration-300 ${isActive ? 'bg-purple-100 text-purple-600 border-r-2 border-purple-600' : ''
            }`}
        onClick={handleClick}
    >
        <div className="p-2">
            {icon}
        </div>

        <div className="p-2">
            {text}
        </div>
    </div>
}

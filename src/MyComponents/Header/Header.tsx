import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateSearchText, updateFilterValue, headerInterface } from "@/redux/slices/headerSlice";



export default function Header() {
  const dispatch = useDispatch();
  const searchText = useSelector((state: {headerSlice: headerInterface}) => state.headerSlice.searchText);
  const filterValue = useSelector((state: {headerSlice: headerInterface}) => state.headerSlice.filterValue);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchText(e.target.value));
  };

  const handleFilterChange = ( value: "Rumi" | "Mother Teresa" | "Albert Einstein" | "reset" ) => {
    dispatch(updateFilterValue(value));
  };


  return (
    <div className="flex items-center max-w-[80%] my-10 w-full lg:max-w-[60%] md:max-w-[70%] sm:max-w-[80%]">
      <Input
        type="text"
        placeholder="Search quote"
        value={searchText}
        onChange={handleInputChange}
      />

      <Select value={filterValue} onValueChange={handleFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by author" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Rumi">Rumi</SelectItem>
            <SelectItem value="Mother Teresa">Mother Teresa</SelectItem>
            <SelectItem value="Albert Einstein">Albert Einstein</SelectItem>
            <SelectItem value="reset">⟲ Reset Filter</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
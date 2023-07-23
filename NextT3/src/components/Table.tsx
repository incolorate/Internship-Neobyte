import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

export default function Table() {
  return (
    <table className="w-full table-fixed">
      <thead className="bg-zinc-300 p-2 text-left">
        <tr>
          <th className="flex items-center">
            <p>First Name</p>
            <div onClick={handleSort}>
              {sort === "asc" ? (
                <AiOutlineSortAscending className="text-2xl" />
              ) : (
                <AiOutlineSortDescending className="text-2xl" />
              )}
            </div>
          </th>
          <th>Last Name</th>
          <th>Company</th>
          <th>City</th>
          <th>Country</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {filteredData
          .map((object: Customer) => {
            return (
              <tr key={object.id}>
                <td>{object.First_Name}</td>
                <td>{object.Last_Name}</td>
                <td>{object.Company}</td>
                <td>{object.City}</td>
                <td>{object.Country}</td>
                <td>{object.Phone_1}</td>
              </tr>
            );
          })
          .slice(0, perPage)}
      </tbody>
    </table>
  );
}

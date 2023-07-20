// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// import styles from "./analytics.module.css";

// const data = [
//   {
//     name: "Jun",
//     subscriptions: 4000,
//     household: 2400,
//     clothing: 2400,
//   },
//   {
//     name: "July",
//     subscriptions: 3000,
//     household: 1398,
//     clothing: 2210,
//   },
//   {
//     name: "August",
//     subscriptions: 2000,
//     household: 9800,
//     clothing: 2290,
//   },
//   {
//     name: "September",
//     subscriptions: 2780,
//     household: 3908,
//     clothing: 2000,
//   },
//   {
//     name: "October",
//     subscriptions: 1890,
//     household: 4800,
//     clothing: 2181,
//   },
//   {
//     name: "November",
//     subscriptions: 2390,
//     household: 3800,
//     clothing: 2500,
//   },
//   {
//     name: "December",
//     subscriptions: 3490,
//     household: 4300,
//     clothing: 2100,
//   },
// ];

// const Analytics = () => {
//   return (
//     <div className={styles.container}>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="subscriptions" fill="#8884d8" />
//           <Bar dataKey="household" fill="#82ca9d" />
//           <Bar dataKey="subscriptions" fill="#8884d8" />
//           <Bar dataKey="household" fill="#82ca9d" />
//           <Bar dataKey="subscriptions" fill="#8884d8" />
//           <Bar dataKey="household" fill="#82ca9d" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Analytics;

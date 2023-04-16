import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function TabBar({ handleToggle }) {
  const data = [
    {
      label: "Hexadecimal",
      value: false,
    },
    {
      label: "Binary",
      value: true,
    },
  ];

  return (
    <Tabs value="html">
      <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className="font-bold text-indigo-500"
              onClick={() =>{handleToggle(value)}}
            >
              {label}
            </Tab>
          ))}
      </TabsHeader>
      {/* <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody> */}
    </Tabs>
  );
}

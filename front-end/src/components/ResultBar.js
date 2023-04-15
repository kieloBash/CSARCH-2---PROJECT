import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
  
  export default function ResultBar({ handleToggleResult }) {
    const data = [
      {
        label: "Fixed-Point",
        value: false,
      },
      {
        label: "Floating Point",
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
                onClick={() =>{handleToggleResult (value)}}
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
  
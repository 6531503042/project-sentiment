import { FC, ReactNode } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const DashboardCard: FC<DashboardCardProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => (
  <Card className={`shadow-sm ${className}`}>
    <CardHeader className="flex flex-col items-start px-6 pt-6 pb-0">
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && (
        <p className="text-sm text-default-500">{subtitle}</p>
      )}
    </CardHeader>
    <CardBody className="px-6 py-4">
      {children}
    </CardBody>
  </Card>
);

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  tabs?: {
    key: string;
    title: string;
    content: ReactNode;
  }[];
  children?: ReactNode;
  className?: string;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  tabs,
  children,
  className = "",
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-default-500">
            {subtitle}
          </p>
        )}
      </div>

      {tabs ? (
        <Card className="shadow-sm">
          <CardHeader className="px-6 pt-6 pb-0">
            <Tabs
              aria-label="Dashboard tabs"
              size="lg"
              color="primary"
              variant="underlined"
              classNames={{
                tabList: "gap-6",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-primary"
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  title={
                    <div className="flex items-center space-x-2">
                      <span>{tab.title}</span>
                    </div>
                  }
                >
                  <Divider className="mt-2" />
                  <div className="py-6">
                    {tab.content}
                  </div>
                </Tab>
              ))}
            </Tabs>
          </CardHeader>
        </Card>
      ) : (
        children
      )}
    </div>
  );
};

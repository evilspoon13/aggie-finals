import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TabsContent } from "./ui/tabs";

interface IndividualDataEntryProps {
    value: string;
    tabValue: string; // Add this prop
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    label: string;
    description: string;
}

export function IndividualDataEntry({ 
  value, 
  tabValue,
  onChange, 
  handleKeyDown, 
  label, 
  description 
}: IndividualDataEntryProps) {
    return (
        <TabsContent value={tabValue} className="space-y-6 mt-0">
            <div className="flex flex-col items-center space-y-6">
                <div className="w-full max-w-md space-y-2">
                <Label htmlFor={label} className="text-sm font-medium text-gray-700">
                    {label}
                </Label>
                <div className="flex gap-2">
                    <Input
                    type="text" 
                    id={label}
                    value={value}
                    onChange={onChange}
                    placeholder={`Enter ${label}`}
                    className="rounded-md focus:ring-[#562626] focus:border-[#562626]"
                    onKeyDown={handleKeyDown}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    {description}
                </p>
                </div>
            </div>
        </TabsContent>
    );
}
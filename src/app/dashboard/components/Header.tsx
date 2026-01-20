import { PanelLeft } from "lucide-react";

interface Props {
  handleOpen: () => void;
}

const Header = ({ handleOpen }: Props) => {
  return (
    <div className="h-full w-full flex items-center px-6">
      <div className=" w-full flex items-center  justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpen}
            className="p-2 rounded-lg hover:bg-secondary transition-colors group"
          >
            <PanelLeft
              className="w-5 h-5 text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors"
            />
          </button>
          <span className="text-sm font-medium text-muted-foreground hidden md:block">Dashboard Control Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-bold">
            AJ
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { PanelLeft } from "lucide-react";

interface Props {
  handleOpen: () => void;
}

const Header = ({ handleOpen }: Props) => {
  return (
    <div className="h-full w-full flex items-center px-4">
      <div className=" w-full flex items-center  justify-between">
        <div>
          <PanelLeft
           onClick={handleOpen}
           className="text-neutral-700 hover:text-neutral-400 cursor-pointer "
            />
        </div>
        <div>user</div>
      </div>
    </div>
  );
};

export default Header;

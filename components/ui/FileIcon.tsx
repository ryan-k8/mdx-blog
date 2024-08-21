import { getIcon } from "material-file-icons";

interface FileIconProps {
  fileName: string;
}

const FileIcon: React.FC<FileIconProps> = ({ fileName }) => {
  return (
    <span className="flex items-center gap-x-1 flex-row">
      {fileName}
      <span
        dangerouslySetInnerHTML={{
          __html: getIcon(fileName).svg.replace(
            'style="width:100%;height:100%"',
            'width="25" height="26" '
          ),
        }}
      ></span>
    </span>
  );
};

export { FileIcon };

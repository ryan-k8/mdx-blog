type TProps = {
  name: string;
  value: boolean;
  text: string;
  onChange: () => void;
};
// {
//   /*<div className="flex  items-center">
//   <input
//     id="default-checkbox"
//     checked={metaInputs.isPublished}
//     onChange={() =>
//       setMetaInputs((prev) => ({
//         ...prev,
//         isPublished: !metaInputs.isPublished,
//       }))}
//     name="immediate_publish_check"
//     type="checkbox"
//     className="checkbox bg-light-grey dark:bg-dark-grey"
//   />
//   <label
//     htmlFor="default-checkbox"
//     className="ms-2 text-sm font-medium  dark:text-gray-300"
//   >
//     immediately published 🤔 ?
//   </label>
// </div>*/
// }

export default function CheckBox(
  { value, onChange, text, name }: TProps,
) {
  return (
    <div className="flex  items-center">
      <input
        id="default-checkbox"
        checked={value}
        onChange={onChange}
        name={name}
        type="checkbox"
        className="checkbox bg-light-grey dark:bg-dark-grey"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium  dark:text-gray-300"
      >
        {text}
      </label>
    </div>
  );
}

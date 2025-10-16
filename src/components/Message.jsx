
const Message = (props) => {
  const { variant, children } = props; // take values from props

  // Default style = blue
  let boxStyle = "bg-blue-100 text-blue-800";

  if (variant === "success") {
    boxStyle = "bg-green-100 text-green-800"; // success = green
  } else if (variant === "error") {
    boxStyle = "bg-red-100 text-red-800"; // error = red
  }

  return (
//  this will be the text inside 
    <div className={`p-4 rounded ${boxStyle}`}>
      {children} 
    </div>
  );
};

export default Message;






// const Message = ({variant,children}) =>{
//      const getVariantClass = () =>{
//           switch(variant){
//    case "success":
//      return "bg-green-100 text-green-800";
//    case "error":
//      return "bg-red-100 text-red-800" ;
//    default :
//    return  "bg-blue-100 text-blue-800";
//           }
//      };
//     return <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>;
// }
// export default Message;
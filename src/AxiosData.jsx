import axios from "axios";
import { useEffect, useState } from "react";

function AxiosData() {
    const token1="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiN2IxMTI3MTNlYTAzZTkwYmI5NTA4YTA3Y2IwZGMxOTAxMWQ5NmY3NTQ5YTRjYjEwYTFjOTY5MjljODBkOGMxZTY1MGIwMjViNDIxNDZhYWQiLCJpYXQiOjE2NzgwOTgyNzAuNTE4MzQ2LCJuYmYiOjE2NzgwOTgyNzAuNTE4MzUsImV4cCI6MTcwOTcyMDY3MC41MTMzMTIsInN1YiI6IjEyNzIiLCJzY29wZXMiOlsiKiJdfQ.pZ3oiRGwLgx3V88sjucy4F5ciiVWQRKtGoyzJbq7uBxFACChtX32MdogcDfOaBTL1dhCWPctPZ0TzMStnghxQNdzaLxUTegFMBnq2l0RWtDGX4Ic8EdRAnpBM1OOVzMCUHeM8Do02OQP-WnbsRBUsCamkIUCF52NJTO8yN-B3p-DZGVI6rZiTUfn8HJXxLXr3yMcNsu3FTDQAnNZuBuuN7gOXkWijM0HtRkaJVm20VJjJmXCUCP6MhKr3T5uC7_fmFrCeTwgomPNVEYfpIMqKtlJIwdz51xgIMIF0la_50n7RiBcrLACgp0wpnKyR_hvbgkqKrKEP2iab83Dz-mXgeIsIiX23eqioxCtL2GVpKt2Q86u6Jr522S808JI5zighJ_LojjncT3EGTAGTVaAX_EwuBy5YBKzHCKI4sE2YISJBB3Fn38JExOnCA-5DY78tCS8xJLYV_CcZqYk_O4epmzzDYQrbX8Te7lEyn3cfF33Nr8QCBREx8RZFZZKrNN0fMjsRgvxbnyXee7CDPfrJFOnk2xGw35IvGBQ06wafuQZmtiv1Qdourg8Y4fhji6c4KVn75cYcfYM2Br6WsXL3so5NCldntqYkxlIyRwXl_10OG4fFstdnw8J7Nfvm9yzVtfvDr48bv4hDCFSioqj5r_Gq3IzwbQJHm6ZW18U4C8";

  const [post, setPost] = useState(null);
  const [filter, setFilter] = useState(null);
  const [checkbox,setCheckBox]=useState("default");
  const [algorithm,setAlgorithm]=useState("");
  const [dropdown,setDropdown]=useState({})

  useEffect(() => {
    fetchMyAPI();
  }, [filter,checkbox,dropdown]);

   useEffect(()=>{
    axios.get('http://codedistrictem.com:7020/api/v3/get-algorithms',{
        headers:{Authorization:`Bearer ${token1}`}
    })
    .then((reponse)=>{
        setAlgorithm(reponse?.data?.data)
    });
   },[])
   
  const fetchMyAPI = async () => {
    console.log("api data comes plz wait");
    
    let a = await axios.post(
      "http://codedistrictem.com:7010/api/v1/topic/getAll",
      {
        algorithm: dropdown,
        asofdate: 1678197239.27,
        namespace_id: 1,
        page_number: 1,
        page_size: 15,
        search: "",
        filter: filter,
        asof: checkbox,
        user_email: "",
      }
    );

    await new Promise((r) => setTimeout(r, 0));

    setPost(a.data.data.topic);
    console.log("post data", { post });

    // console.log("get", a.data.data.topic);
    // console.log("get id", a.data.data.topic[0].id);
    // console.log("get id", a.data.data.topic[1].id);
    // console.log("get id", a.data.data.topic[2].id);
    // console.log("get id", a.data.data.topic[3].id);
    // console.log("get id", a.data.data.topic[4].id);
  };

  console.log("post data", { post });
  console.log("set algorithm",algorithm);
  console.log("set dropdown",dropdown);

  return (
    <>
      <h1>Hello world</h1>
      <label>Canonizer Algorithm:</label>
     <select value={dropdown} onChange={(e)=>{
        // console.log("event value => ",e.target.value)
        setDropdown(e.target.value)}}>
     {
       algorithm && algorithm.map((item,index)=> <option  value={item.algorithm_key}>
        {item.algorithm_label}
        </option>)
     }
     </select>
      <label>Filter</label>
      <input
        type="number"
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      ></input>

      <div>
        <input 
        type="checkbox" 
        id="default"
        checked={checkbox==="default"}
        onChange={()=>setCheckBox("default")}
        ></input>
        <label>Default</label>
        <input type="checkbox" 
        checked={checkbox==="review"}
        onChange={()=>setCheckBox("review")}
         
        ></input>
        <label>includes review</label>
      </div>
      <button onClick={(e) => fetchMyAPI()}>AxiosButton</button>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Support</th>
            <th>ID</th>
            <th>topic_num</th>
            <th>topic_name</th>
            <th>topic_score</th>
          </tr>
        </thead>
        <tbody>
          {post &&
            post.map((topic, index) => (
              <tr>
                <td>{index}</td>
                <td>{topic.support}</td>
                <td>{topic.id}</td>
                <td>{topic.topic_num}</td>
                <td>{topic.topic_name}</td>
                <td>{topic.topic_score}</td>
              </tr>
            ))}
        </tbody>
      </table>


    </>
  );
}

export default AxiosData;

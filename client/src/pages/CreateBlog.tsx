import { Check, ChevronDown, Loader2, Upload, X } from "lucide-react";
import React, {
  HtmlHTMLAttributes,
  useActionState,
  useRef,
  useState,
} from "react";
import Editor from "../components/Editor";
import { blogSchema } from "../schemas/blogSchema";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface Category {
  id: string;
  name: string;
}

interface IFormData {
  title: string;
  content: string;
  category: string;
  image: File | null;
}

const categories: Category[] = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Travel" },
  { id: "3", name: "Food" },
  { id: "4", name: "Lifestyle" },
  { id: "5", name: "Business" },
  { id: "6", name: "Health" },
];

export default function CreateBlog() {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
    useState<Boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const authUser =
    JSON.parse(localStorage.getItem("blog-app-user")!) ||
    useUserStore((state) => state.authUser);
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitFunction = async (
    prevState: IFormData,
    formData: FormData
  ) => {
    const title = formData.get("title") as string | null;
    // const image = formData.get("image") as File | undefined;

    const zodResult = blogSchema.safeParse({
      title,
      content,
      category,
    });
    const validationError = zodResult.error?.format();

    if (!zodResult.success) {
      toast("Please provide all the required data!", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      setTitleError(validationError?.title?._errors[0] ?? "");
      return {
        title: title ?? "",
        content: content ?? "",
        category: category ?? "",
        image: image ?? null,
        error: validationError,
      };
    }

    // Api call
    try {
      const url = "http://localhost:3000/api/v1/blogs/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          content,
          category,
          image,
          author: authUser._id,
        }),
      });

      const jsonResponse = await response.json();
      if (!jsonResponse.success) toast.error(jsonResponse.message);
      else {
        toast.success("Post created successfully!");
        // Redirect to the post page
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! an unexpected error occured");
    }
    return {
      title: title ?? "",
      content: content ?? "",
      category: category ?? "",
      image: image ?? null,
      error: null,
    };
  };

  const [state, formAction, isPending] = useActionState(
    submitFunction,
    {
      title: "",
      content: "",
      category: "",
      image: null,
      error: null,
    }
  );

  return (
    <div className="min-h-screen w-full p-2 md:p-4 md:px-8">
      <div className="h-full w-full bg-white md:p-4">
        <h1 className="text-2xl md:text-3xl font-bold my-2 md:my-4">
          Create New Blog
        </h1>
        {/* form */}
        <div className="w-full ">
          <form
            action={formAction}
            className="w-full min-h-screen py-2 md:py-4
          ">
            {/* title input */}
            <div className="title-input mb-4">
              <label
                htmlFor="title"
                className="font-semibold text-sm">
                Blog Title
              </label>
              <input
                type="text"
                defaultValue={state.title as string}
                name="title"
                id="title"
                onChange={() =>
                  titleError.length > 0 && setTitleError("")
                }
                placeholder="Enter a title for your blog"
                className="w-full my-2 p-2 md:p-3 text-lg rounded-lg outline-0 ring-1 ring-gray-300 focus:ring-blue-500"
              />
              <p className="text-red-400 text-sm h-5">{titleError}</p>
            </div>
            {/* category */}
            <div className="title-input my-2 select-none relative">
              <label
                htmlFor="title"
                className="font-semibold text-sm">
                Blog Category
              </label>
              <div
                className={`w-full flex justify-between items-center my-2 p-2 md:p-3 text-lg rounded-lg ring-1 cursor-pointer hover:bg-gray-50  ${
                  !isCategoryMenuOpen
                    ? "ring-gray-300"
                    : "ring-blue-400"
                }`}
                onClick={() => {
                  setIsCategoryMenuOpen((prev) => !prev);
                }}>
                <button type="button" className="">
                  {category ? category : "Select a category"}
                </button>
                <ChevronDown className="text-gray-500" />
              </div>
              <div
                className={`overflow-hidden absolute w-full z-20 pb-4 transition-all  duration-500  ${
                  isCategoryMenuOpen ? "visible" : "invisible"
                } `}>
                <div
                  className={`cat-dropdown-menu w-full z-20 relative bg-white h-56 rounded-lg border-b-1 border-b-gray-200 transition-all duration-300 ${
                    !isCategoryMenuOpen
                      ? "-translate-y-[15rem] "
                      : "translate-y-0 shadow-lg "
                  }`}>
                  {categories.map((cat, i) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.name);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer ${
                        i < categories.length - 1
                          ? "border-b-1 border-b-gray-100"
                          : ""
                      }`}>
                      {cat.name}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-red-400 text-sm h-5">
                {(category.length <= 0 &&
                  state.error?.category?._errors[0]) ??
                  ""}
              </p>
            </div>

            {/* Featured image */}
            <div className="w-full min-h-40 rounded-lg border-dashed border-2 border-gray-300 mt-12">
              {imagePreview ? (
                <div className="w-full relative h-64 flex items-center justify-center py-4 p-2">
                  <img
                    src={
                      imagePreview ||
                      `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIVFhUXFRUVFxcVFRUXFxUVFRUXFhcXFRgYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi8fHyUtLS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALEBHQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABAECAwUGB//EADoQAAEDAgIGCAUEAgEFAAAAAAEAAhEDIQQxBRJBUWFxEyJSgZGh0fAGFDKSsVNiweFC8RUjM3KCsv/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAtEQACAgECBQMDBAMBAAAAAAAAAQIRAxIhBBMiMUEFUWEUQqEVYnGRMlKBI//aAAwDAQACEQMRAD8A+OseQpN10sTgnDNnG2xIkRmFqmmbZMUoOpF6EQQe5QyjJhSwzkrtJOVj+UxqnRqygW3JieI/Cl1PkfJUBn6s+Ofioe0g2Knc22S2WxDsMNx9ErUokJ+jXj6imXgOFnjkY8jtRbXcXJjNWu5x2uKs1u1M16BnZ3FZNJFirRzuLTpmlSDBjgtaWGm8gDeVjKmmDMiUNGiavdWa1BIIGzzSFQLpspzkb8kvUw+/ekh5IN7ilI3BT1ShYO2FLinBXRo4hoaWOyN2ncd3IpvYnFFO1LYSNaBG1UO9TVbLvFbU6XV74TFTbo3wwkEcP7S9WjEpqgwyAMwZV6rTJkZjyU9mdDjqiJVAC0XvELBi1e3cshmqRzy7m5bIS9TJM0NyzdTQElasVhWaVLmq1EXVIxrctUYs1rUKzhMb7lKgVSLLV4VHBBLKMbK3NgppUzsHsqajIzSCtrF9WV1MG3Ug5Q0+aRpm42JipXlp5wPVJqzXE1F2Y4qpI5mUuxk5rVzbLNztiRLdu2MUcV/5eKtWqA/SRxCTLSFJCVF82VUySCMvBXY7fPcopvjemGjdPkgIq+xmDJzPetiw7ZlU6NatfOaC0vcKVPYUVMPGV0wKavWZZKzbl7bijXxsWUSc00MPItmqtoEFO0Q4S2vsYmmU5g8LOa0MbVJdIAGYRZpHHGLt7i2KpRMbDCya6Lnvn8rqU8NInyVq2FaGzs2pavBfIk+pbHLe2YgHvWLmFNtaWktvCZpYcFOzLluRhg8LNz5/wit1HECC3MRxTmKf0dm7pHBYYVmvDctg/vzQvc0cUuhdy+jnf9QO3cwFtjCCTExMztJ3clONodGWsH1DrO8LBWo0QW5qNv8AI6Ixkk8Ry6lK9sllWpXnYnMWyDAWlFgLHTvnyVXSs5ni1ScTnU7XWlMTKuaBHJaUIVMzjF3TOfWaq0At8WFi2wVI55qpFHlXY20rOJW78oTIW5iVUBWIUJkjFOvq5Zz/AKWD3SqKyQ7b2NGtsSeHqq0Wk+8gr1DY90eCllPMZWHiUi1HcHtnJVfRbv8ABXa2RbYlqmahltUuxZpnNDGxyVGuWrSqITstVpxtB4hbYd4Hesn1Jzv+VQEpGmpRlaGrFT0axa5Pa0tGUxsnzSextCpdw17R/CzN1WoVFB1x/KKKc96ZvRZeE3TpTbwSzje3vvQ2oc7qGbwai6L4inBWuHbbcrE62eau2kRCVmqx9VrsZsqFpCq55JjYclqQDaFNakWxbuCpMTi6+C+Fwes4B3iVjX+s2gCB3CyYp15ETBV6tLW628AH3vU273NdEZQqIhVpbYnis8M+Oa6DaHVIul2YUTMqoyMZ4ZJpoa1ukaHkXFjyVcPRIJAKvhamoT+Dt3wnXNBgtyOe9Q3Wx1QipLU+/k5VXCkyTnuWVNuq6H2BCZojWdBzE+wt8XhWkjkqutmYcvV1xOZigRYXAy4hYuZlC3xdMttuy5Inqx4Kl2OeUbk7Fq1GUnWYug6Yg5JVzLxvKuJz5YoijhTqF+4wsnBeixOF1KQbvg+S4LmJQnqsriOG5NJ96MQ2clQsT2FZe4MAf6StU3srvc5XDaxchWDVdrJWroTM0ijRMnkt6LNaeJvyCjo56rc/wmKXVYRnfZGSiXY6MUd9+wuypqyNhBn+EjVzWtSoUuVCROTJeyLQrtUNetLHgrIRCArdGc0NEbEx0WDMkzTomNnvcq4eoBZwkHy4rVzIgTOcH3kkzaCS3KVmkC4WC7TNUAaw1mkADrCxi6QrYS2szLmD+OSlM1yYvKM6bsk5Yi3srntfshbUjex8U5RDHkrYdNXd3z6LpYOprASLjL2FyKDutvXQYQMgJmxG73vWU4nfw+Te2zFzyypcWm4T7NVzgNYARF8+7ekMY+8zf8q2FLSZcSCMk2rQ4ZNM3HxY47CAGRPcVSniQ2B4jZHgr1MYBYHP87iqDDdI2QRI2W8Y2qN66jd1f/l3GMTTBBdOYEJXRtyY+obE5Rp6o1bEEHcI5xbakMONV5GR3oi9mgy2pxlX8jFbCFxcQLjajDMLbO+mQM58oCdwtOqTf6SDC3qU2lsm3LKeEZKHPwbRwJ9fZnnsS2KgMxn7807Rxbi76dabExkFXSmGJuBl7zTejqLgwjWacsiD+CStZSThZyY4SWZxW3k5OOZsHsJV9W0bl1MdRjZB/grl6nNOL2MM8GpsiCQLkrHJ7eBC6mGb+0d6Wqs6xMblcZGOTE0kztac+gRuH4Xm9Regxzy+k08AucGQMljw/TE7fUVzMqa9kJ414b1Wm035pAhb4imZVaTF1R2R4uS5SoGUrKrqaYcICo5ylyL5WxlSpkEE5EwpxVacuSpUfKzIRV9yXLStKMXKpatS1UKbOeg1VMLSEQmXpKgla9JOarqqQ1A1ZpY5LZrtnspcNWglOi0zRwMWNtymjiyLHKdmxUVdRFWPU07Q3iIzG3bl3pWozbMqwCs1CjQ5S1dytBxG1OMxnilnBVDENJhGco7I6DHawkeCo52//XJLNJW1J5m90tJqstmNVxBiV0NHY0tNs4996Vr05KzbY2II7/5CHFNCjkljnaZ6jDYtjiGyA45RIHeDvWeM0dBDjkezc9wXOwLgREX3+i7D8WG09Qwc5JzjgQuaUNMuk9eHERyY+sUq4lrWiCbf4k+anD1WVB1nGTNhO7MLlYogmyXY8tMgkLXlJo5HxrU91aOvXxBHUfPpsvwT2j8K1zJY/rcLbl56tVc7rEkk5pjRuIeDAke9qUsfTsGPik8ttWvyehq4SWy7O4kxmNhSH/FHVJYJvvV36R6NpEyTvsPUpfC6cLDbllaOW1YLHPujvlxOFtKYlUkWIIIQwyI816OrSbVaDqAOO0TBC5VTBEchtGV+ITU01XZkS4eSepO0Q1+tTDY2+Sio1pls5C3FM1KGpTJJiLA/4meMrn0qZngBJPD3CItU6KyqWpJruc7ECUs43TVUyZ45bUnXK117HlTx02yHOVc1alSJK1fRjNRq3Hy5NWL6qq9bOYoNOFpqMXjFiFXUW7iqEJOTM9CGOhR0K6baCn5ZPWbck5YoqeiXVGFR8qnrDkM5gpKwpLo/LK3yqfMDks54pKehXRGHWgw6NZSwM5goqegXUGFU/Ko5gchnL6BT0K6owqzxFIMaXHYjmIHhaVnN6JYvrNaYLhO7aufi9MOdIaNUZWufFc3n729yl5DllNX0nfdpOmJkkngM0hV0q45NAHiVzypAlQ8jE5SkNM0rVF2ujkApbpWtJOuTIi8EeBS7KUqworNyZSUvcsMfV7Z7wPRXGkqkzblFll0Soad801N+5LizoUNLbHjvHon8NpJptrRzt5rzxUg+81ayMSm4s9TTeH3B1vNafLncvK4fEOpkOYYO/wDg7F6PQ2mOlcGVAATtmJ7j/CrmM6MWSM3Uu51sBjXU7Zjcdy7lCox5kRrAX2G3fuuuU/Cwim0g7fNYzipbo9fDnnh6Zbo305dgiJGcjM7Lb1zKo1aQsesJJIP8Bd+g8RrOMmTa0+8ljpFrCLQYuOZ2LnWqO1eTvly8ly1K6PJPLdhA55rAtJPuye0hAtHspdmHfnEDefd1upHlZMfVXf8Ag3ojUE7ViKLnGVpSBmSffLNbGTvjgISTNHG4peBZ9EN2pSq8JypRKy6C97d6tM5Zwb2SoUAJ2ILSnCQMgsHvVWYShR6NtFaCimA1GqsdR6KxoxFFT0K2DVoGo1F8tC3Qq7aHBMBqsAlqKWNC3QLRtBMtatWMU6yljQuygtBhk01i3a0KHMtQQiMKvP8Axm/UowNWXGLm8bdUbT6r15MLyHxF8Mvr4gVGusWw6SAG6uQFib8iqhPfc5uLjLltQVtniMNhda8gDiYvz3q9JjNutrTtsLTY7jluyKc0to/oaopOcD9JLWySAdgtnF1nXqNIDBTa0631lzrCLBxJj0hdFngaadPuW+UY4NDPqIu25MyZndbfw5qHYAzYSbkhsmAOKKMt+gEH/KHAtIF2lrpzzyJsulh8WDmCHCNUDKDOed8vNRJ0b4oWxPDYMmI8xkTl5J/C6N3tJMGwtaM77J97F0tF4Qv2CzW5n9pgZxxjevQs0Y//ALjBq61gGzYQON/p8SuPJmo9fFwkWtzw1TRxzAMb42bYE3CRqYMlxGZgk7pE2nJe8xmhy0ahDQTLg42iBEA5Xie4jMrzuIIa7rAasvDtQuyJEgX5bdnjpjy2Y5+GSVo4rdHS3WkQBJjOIkiDt5bwsq7adg3dcid+0drhfmn8ZinElrW6ok6pJgwDI1oEHZbKTxXNqNEFwIEQeses47Y4e+fSmeXONFW0muJjqiP8jblO03tZRhnmlVaZA1TtyibzE2WteqHAkU2tyjVBERnInzA2LBjHVCGNaS4mBxJ2DYFRl52PpuFZrtBkEZyCmBSiwCw+G9GdBQawkk5kSIDjmBwXWNMWMLnc9z6JJuKbVMVo6Nc6+QW50c0C7pPMf7XUFdpbAAFtu9cmthnunrDuMjvWE88/4OvhuHxPds5uLwVKZgE7lzcVcxa27Lv9F2nYANzdPGD6RCWdhaYyI8D/AAsoydnoy0NUjhOpEmB/f9K7MO/IDvXWFNm4nuK2Y+MmHwAW/MOF499kzjDRbzvWw0Edo8V2W1yNnmSs6mJech4A/ko53sJ8Je7Rx6uiAM48PVJ1MI0bvJdXENqn/E+IXNq4WoTsHeFrHL8nHm4drsjshymV88+aqfqP+93qp+aqfqP+93qujlfJ5q9Q+D6IIVpXzwYup+o/73eqn5l/6j/ud6pcr5K/UPg+hhysHr52MS/tv+53qrCu/tu+4+qOTfkr9Q/afR2FbsXzMVn9t33FXFV/bd9xS+m+Sl6h+38n1Gm1bhi+VtqP7TvuKu1z+07xKl8I/ctcen9v5PpVVDGr54wv7R8SmqYf2j4lH07Xk2jxOrwevx2gqNUlz6bS4gjWAh0ERmLrnj4XoANaGnqix1id9zNib+xZcllJ+8rdlF2/z/pJY2vuHy4TduI/U+FaYpPbTc9usJ1W6hnVuBqkQbgbQTlMZcer8LV6bC8kFgkkWaQDHW1chttP+PcujTYd58U1RJ3qZRl7lx4SF2tg0Boavm0EECbhzZBERJG0EjuX1P4PqUm04qABwbHWABjw5eC8Hg38Ul8WaWfTbS1XES5wnhAXFKEozTRpxOHXipvY9H8S4A1qruhBayHXuGxNxuPJeExXw1Xe/qtJvBLgWgDKZcL7fpnK0r2dbEEiJNhAXMrudvKWGMu5suH6NLZxsN8AyZrVpykNaDkLdZ4NgZ2bl0h8EYYAjUsbZ3jdrZ+axq1anad4n1SlXEVv1H/cfVdeib+45nwmOPizsUvgvCy3/pN6oLRmRB7V78yug3Q9KlZjWt22AFzyXjn16/6j/vd6rCpiq/6j/vd6o+nyP7hLRB2o1/xHuehHBQaQXz2rjK36j/uclX42t+q/73Klws/9iJ8VBeGfSHuDdqTfjf3R3BfPH4uqc6j/ALneqxdiKn6j/uKUuBnLvIIepYsf2P8As+gPxU/5H3yCXOK/d5f2vBnEVO277iqGu/tu+4qfoGvuLfrUPEH/AGe/GLHace/0Cl2MA93818+OJqdt/wBxVDiX9t33H1R9E/cX61Gv8X/Z9DOkFlU0j7lfPziH9t33FUNd3bd9xVLgvkzl6zH/AE/J7itjuIST8WO15LyXTO7bvEqpqO7R8SrXC15MJerJ/YQFMKJUhdp4qLAKVUKwKRVlwrALMOVgUykzVqu0rEOVxU4popMYafdlqyfYKVD+S0a7gmWpDtN/v2E5Rqe5uuaypzW7H8z3NKlo3hlo6zHn2FuKnPvBH8LlNrAbR9npAW1OsOG+xjwErNxOuGZnTbUVqdaDmuZWx7Gi7huOtM8lya+nwJDB37FhJHQ+JhDuz3eHxHEe+S898dYrqU94c7/5/pedf8RVthA8Unice+pGu7Wi91ly3dszz8fjnjcY3bPq9HFS3P33Kr38fwvmlHT9ZogOkcROS2pfFNcG8Ed4SjjaN16nha3s91WckalX37C4lH4qY6zwW5Xued0wNIseLOmeMAz/AO1zwW8V7ilxUJLoY4+pz81hVqb57wB52Sr6448QAe7MrKpU4eTQt1E4552TWqcvH+0q9/u/opqPPu4/Cwe/3K0SOSeSwcfeSycVDn8lm6p7umYuRJWZQXKhKRFklVIQXKspE2BCqQpJVSgTZCgqZQggiUKApCAJVgqyqGuAk2kBuFKUdiCs3PJ2qXNDseLwNqj5pu/ySCEtbDUPnGN4qPnh2SkUI1sNTOgNJft81ozS/wC0/d/S5aAlqZSm0dY6ZPZ8/QBL19JPdaYG4SP9pNCTbZWuT8kucTmSUSoQkKywcp1lRCVDtl9dVLlCEBbCUNdGSEJkjVPSFQWm3EBaf8q/bB8fVIqpTtjc37j50meyPNV/5A9kJJCepk62OfPftR87w80mhGtitjnzQ4qwrNO1IoT1sLH9YIKRDiMirtrlNTQWMFCzbVBV5Vp2IColChAFDUVTVWaFlqYElxKhCFIAhCEACEIQAIQhAAhCEATKFCAgdlkKFKCgRKEJUAIUKJTE2ShQhArJJUIQgQIQhAAhCEACEIQAIQhAApBUIQBcVCrdKskJ6mAIQhIAQhCABCEIAEIQgAQhCABCEIAEIQgCQpQhBaBCEIAgqEIQQwQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIA//9k=`
                    }
                    alt=""
                    className="h-full rounded-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <X
                      onClick={() => setImagePreview("")}
                      className="size-8 bg-red-500 rounded-full text-white cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-32 my-3 flex items-center justify-center">
                  <div className="text-center flex flex-col items-center">
                    <label
                      htmlFor="image-file"
                      className=" flex flex-col items-center cursor-pointer">
                      <Upload className="size-12 text-gray-400" />
                      <span>Choose a photo</span>
                      <input
                        type="file"
                        name="image-file"
                        id="image-file"
                        accept="image/*,.png,.jpg,.gif"
                        className="sr-only"
                        ref={inputRef}
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* content Editer */}
            <div className="min-h-54 w-full mt-8 border-1 border-gray-200 rounded-lg">
              <Editor onChange={setContent} />
            </div>
            <p className="text-red-400 text-sm h-5">
              {(content.length <= 10 &&
                state.error?.content?._errors[0]) ??
                ""}
            </p>
            <div className="flex justify-start py-4">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Check className="-ml-1 mr-2 h-5 w-5" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

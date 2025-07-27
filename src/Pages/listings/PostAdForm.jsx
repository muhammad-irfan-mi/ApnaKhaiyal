import React, { useContext, useState } from "react";
import Banner from "../../component/Banner/Banner";
import {
    LocalOffer as LocalOfferIcon,
    FolderCopy as FolderCopyIcon,
    FormatListBulleted as FormatListBulletedIcon,
    Image as ImageIcon,
    Link as LinkIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import { Context } from "../../Context/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyMap from "../../component/map/PropertyMap";

// Reusable Field Component
const FormField = ({ label, children }) => (
    <div className="flex justify-end items-center gap-3 mt-5">
        <label className="block mb-1 font-medium w-[20%] text-right">{label}</label>
        <div className="w-[80%]">{children}</div>
    </div>
);

const PostAdForm = () => {
    const [formState, setFormState] = useState({
        pricingOption: "price",
        priceType: "Fixed",
        price: "",
        maxPrice: "",
        title: "",
        description: "",
        tags: "",
        features: "",
        videoURL: "",
        state: "",
        zip: "",
        address: "",
        phone: "",
        whatsapp: "",
        email: "",
        website: "",
        lat: null,
        lng: null,
    });

    const { theme } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    const adType = query.get("type");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleMapChange = ({ lat, lng }) => {
        setFormState((prev) => ({ ...prev, lat, lng }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append("adType", adType);
        form.append("category", category);
        form.append("title", formState.title);
        form.append("description", formState.description);
        form.append("pricingOption", formState.pricingOption);
        form.append("priceType", formState.priceType);
        form.append("price", formState.price);
        form.append("maxPrice", formState.maxPrice);
        form.append("tags", formState.tags);
        form.append("features", formState.features);
        form.append("videoURL", formState.videoURL);

        ["state", "zip", "address", "phone", "whatsapp", "email", "website"].forEach((key) => {
            form.append(key, formState[key]);
        });

        form.append("lat", formState.lat);
        form.append("lng", formState.lng);

        if (formState.images?.length > 0) {
            formState.images.forEach((file) => {
                form.append("images", file);
            });
        }

        try {
            const res = await fetch("http://localhost:5000/api/property", {
                method: "POST",
                body: form,
            });

            const data = await res.json();
            console.log("Success:", data);
        } catch (err) {
            console.error("Error:", err);
        }
    };


    const { pricingOption, priceType, price, maxPrice } = formState;
    const showPriceInput = pricingOption === "price" && (priceType === "Fixed" || priceType === "Negotiable");
    const showPriceRange = pricingOption === "price_range";

    const contactFields = [
        { label: "State", name: "state" },
        { label: "Zip Code", name: "zip" },
        { label: "Address", name: "address" },
        { label: "Phone", name: "phone" },
        { label: "WhatsApp", name: "whatsapp", placeholder: "Include country code" },
        { label: "Email", name: "email", type: "email" },
        { label: "Website", name: "website", placeholder: "https://example.com" },
    ];

    return (
        <div className={`${theme.mainbg} text-gray-500 font-normal pb-14`}>
            <Banner title="Post an Ad" />
            <div className={`${theme.boxbg} p-5 w-[90%] mx-auto mt-14`}>
                {/* Category Section */}
                <div>
                    <div className="flex items-center gap-2 my-3">
                        <LocalOfferIcon className="text-black" />
                        <h2 className="text-lg font-bold text-gray-800">Select Category</h2>
                    </div>
                    <hr className="mb-7 border-gray-200" />
                    <h3 className="text-gray-500 font-medium">
                        {category} {'>'}{" "}
                        <span
                            className="text-lg hover:underline hover:text-blue-900 cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            Change Category
                        </span>
                    </h3>
                </div>

                {/* Product Info */}
                <SectionHeading icon={<FolderCopyIcon />} title="Product Information" />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField label="Property Title">
                        <input name="title" value={formState.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                    </FormField>

                    {/* Pricing Option */}
                    <div className="flex items-center gap-8 w-[70%] mx-auto">
                        <label className="block font-medium mb-1">Pricing</label>
                        <div className="flex gap-4">
                            {["price", "price_range", "disabled"].map((opt) => (
                                <label key={opt} className="flex items-center gap-2 font-normal text-gray-600">
                                    <input
                                        type="radio"
                                        value={opt}
                                        checked={pricingOption === opt}
                                        onChange={(e) => handleChange(e)}
                                        name="pricingOption"
                                    />
                                    {opt === "price" ? "Price" : opt === "price_range" ? "Price Range" : "Disabled"}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Type */}
                    {pricingOption !== "disabled" && (
                        <FormField label="Price Type">
                            <select name="priceType" value={formState.priceType} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                                <option>Fixed</option>
                                <option>Negotiable</option>
                                <option>On Call</option>
                            </select>
                        </FormField>
                    )}

                    {/* Price Input */}
                    {showPriceInput && (
                        <FormField label="Price">
                            <input name="price" type="number" value={formState.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </FormField>
                    )}

                    {/* Price Range */}
                    {showPriceRange && (
                        <div className="flex gap-4 justify-end">
                            <div className="w-[40%]">
                                <label className="block mb-1 font-medium">Min Price</label>
                                <input name="price" type="number" value={formState.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div className="w-[40%]">
                                <label className="block mb-1 font-medium">Max Price</label>
                                <input name="maxPrice" type="number" value={formState.maxPrice} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                        </div>
                    )}

                    <FormField label="Describe Your Property">
                        <textarea rows={4} name="description" value={formState.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                    </FormField>

                    <FormField label="Add Related Tags">
                        <input name="tags" value={formState.tags} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Comma separated" />
                    </FormField>

                    {/* Features */}
                    <SectionHeading icon={<FormatListBulletedIcon />} title="Features" />
                    <FormField label="Add Features List">
                        <textarea name="features" rows={3} value={formState.features} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Feature 1\nFeature 2" />
                    </FormField>

                    {/* Images */}
                    <SectionHeading icon={<ImageIcon />} title="Images" />
                    <FormField label="Images">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setFormState(prev => ({
                                ...prev,
                                images: Array.from(e.target.files)
                            }))}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </FormField>

                    {/* Video URL */}
                    <SectionHeading icon={<LinkIcon />} title="Video URL" />
                    <FormField label="Video URL">
                        <input name="videoURL" value={formState.videoURL} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Only YouTube or Vimeo links" />
                    </FormField>

                    {/* Contact Details */}
                    <SectionHeading icon={<PersonIcon />} title="Contact Details" />
                    {contactFields.map(({ label, name, type = "text", placeholder }) => (
                        <FormField key={name} label={label}>
                            <input
                                type={type}
                                name={name}
                                value={formState[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </FormField>
                    ))}

                    <FormField label="Map Location">
                        <PropertyMap lat={formState.lat} lng={formState.lng} onChange={handleMapChange} />
                    </FormField>


                    <div className="text-right">
                        <button type="submit" className={`${theme.primaryColor} ${theme.btnHover} text-white px-6 py-2 rounded`}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SectionHeading = ({ icon, title }) => (
    <>
        <div className="flex items-center gap-2 mt-7 mb-5">
            {icon}
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        <hr className="mb-7 border-gray-200" />
    </>
);

export default PostAdForm;

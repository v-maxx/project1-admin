'use client';
import { addLink } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";
import { useState } from "react";

const AddLinksPage = () => {
    const [isActive, setIsActive] = useState(true);

    return (
        <div className={styles.container}>
            <form action={addLink} className={`flex flex-col !text-black`}>
                <div className="mb-4">
                    <label htmlFor="reward" className="mr-2 text-sm font-medium text-white">
                        Video Url
                    </label>
                    <input
                        type="text"
                        placeholder="URL"
                        name="url"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="reward" className="mr-2 text-sm font-medium text-white">
                        Reward
                    </label>
                    <input
                        type="number"
                        placeholder="00"
                        name="reward"
                        defaultValue={20}
                        required
                        className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="isActive" className="mr-2 text-sm font-medium text-white">
                        Is Active
                    </label>
                    <input
                        type="checkbox"
                        name="isActiveCheckbox"
                        id="isActive"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                        className="toggle-checkbox h-5 w-5 rounded-full bg-blue-500 border-4 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {/* Hidden input to submit the actual boolean value */}
                    <input
                        type="hidden"
                        name="isActive"
                        value={isActive}
                    />
                </div>

                <button
                    type="submit"
                    className="max-w-min px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddLinksPage;

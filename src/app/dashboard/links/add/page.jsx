import { addLink } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const AddLinksPage = () => {
    
    
    
    return (
        <div className={styles.container}>
            <form  action={addLink} className={styles.form}>
                <input type="text" placeholder="URL" name="url" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddLinksPage;

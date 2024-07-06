import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import {fetchLinks} from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";

const LinksPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, products } = await fetchProducts(q, page);
  const { count, links } = await fetchLinks(q, page);
    console.log('links==',links)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Link..." />
        <Link href="/dashboard/links/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Link</td>
            <td>Created By</td>
            <td>Created At</td>

            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {links?.map((link) => (
            <tr key={link?._id}>
              {/*<td>*/}
              {/*  <div className={styles.product}>*/}
              {/*    <Image*/}
              {/*      src={product.img || "/noproduct.jpg"}*/}
              {/*      alt=""*/}
              {/*      width={40}*/}
              {/*      height={40}*/}
              {/*      className={styles.productImage}*/}
              {/*    />*/}
              {/*    {product.title}*/}
              {/*  </div>*/}
              {/*</td>*/}
              <td>{link?.url}</td>
              <td>${link?.user?.email}</td>
              <td>{link.createdAt?.toString().slice(4, 16)}</td>
              {/*<td>{product.stock}</td>*/}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/links/${link.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={link.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default LinksPage;

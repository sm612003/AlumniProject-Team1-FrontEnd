import category from "./Category.module.css"

const Category = () => {
  return (
    <div>
      <ul className={category.categ}>
        <li className={category.categMenu}><a className={category.categLinks} href="#">Ai</a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#"> Cloud</a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#"> Engineering</a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#">Web</a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#">Application</a></li>
      </ul>
    </div>
  )
}

export default Category
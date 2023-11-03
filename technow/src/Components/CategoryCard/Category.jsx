import category from "./Category.module.css"

const Category = () => {
  return (
    <div className={category.container}>
      <ul className={category.categ}>
        <li className={category.categMenu}><a className={category.categLinks} href="#">Engineering</a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#">Cloud</a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#">Websites </a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#">Applications</a></li>
        <li className={category.categMenu}><a className={category.categLinks} href="#">AI</a></li>
      </ul>
    </div>
  )
}

export default Category
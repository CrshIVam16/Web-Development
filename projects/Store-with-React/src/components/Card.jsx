function Card({ product }) {
    return (
        <>
            {product.map((item) => (
                <div key={item.id} className="card">
                    <img src={item.thumbnail} />
                    <h2>{item.title}</h2>
                    <p>$ {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
        </>
    );
}

export default Card;

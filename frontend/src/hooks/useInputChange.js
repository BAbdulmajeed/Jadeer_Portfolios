export default function useInputChange() {

    const handleChange = (e , setterFunction) => {
        const { name, value } = e.target;
        setterFunction((prev) => ({ ...prev, [name]: value }));
    };

    return handleChange;
}
import { useState, useEffect, useCallback } from "react";
import { apiConnector } from "../services/apiconnector"; // Adjust path as needed

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = useCallback(async (url, params = {}, headers = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiConnector("get", url, null, headers, params);
            return response.data.data;
        } catch (err) {
            
            const message =
                err?.response?.data?.message || // nested backend message     
                err?.message ||                       // JS error message
                "Something went wrong";               // fallback

            setError(message); // 🔒 Always a string
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const post = useCallback(async (url, data = {}, headers = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiConnector("post", url, data, headers);
            return response.data;
        } catch (err) {
            console.log(err.response?.data?.message )
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const put = useCallback(async (url, data = {}, headers = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiConnector("put", url, data, headers);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const remove = useCallback(async (url, data = {}, headers = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiConnector("delete", url, data, headers);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { get, post, put, remove, loading, error };
};

import React from 'react';
import { useQuery } from '@apollo/client';
import client from '../apolloClient';
import { SEARCH_REPOSITORIES } from '../api/queries/queries';
import {SearchProps, SearchResponse} from '../api/types';
import Skeleton from '../components/Skeleton';

const GitHubSearch: React.FC<SearchProps> = ({ query, first }) => {
  const { loading, error, data } = useQuery<SearchResponse>(SEARCH_REPOSITORIES, {
    variables: { query, first },
    context: {
        uri: import.meta.env.VITE_URI_GRAPHQL_AWS_GITHUB,
    },
    client,
  });

  if (loading && query) return <Skeleton />;
  if (error) return <p>Error: {error.message}</p>;

  return (
        <div>
            <ul className="space-y-4">
                {data?.search.edges.map((edge, index) => (
                <li key={index} className="items-start p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                >
                    <h2 className="text-xl font-semibold mb-1">
                    <a className="text-black font-bold text-xl hover:underline" href={edge.node.url} target="_blank" rel="noopener noreferrer">
                        {edge.node.name}
                    </a>
                    </h2>
                    <p className="text-gray-700">Owner: {edge.node.owner.login}</p>
                    <p className="text-gray-700">Description: {edge.node.description}</p>
                    <p className="text-gray-700">Stars: {edge.node.stargazerCount}</p>
                    <p >Forks: {edge.node.forkCount}</p>
                </li>
                ))}
            </ul>
      </div>
  );
};

export default GitHubSearch;

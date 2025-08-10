"use client";

import React from "react";
import Skeleton from "@/components/Skeleton";

type PageLoadingProps = {
  variant: "list" | "form";
  showHeader?: boolean;
  showRightAction?: boolean;
  formFields?: number;
  listRows?: number;
};

export default function PageLoading({
  variant,
  showHeader = true,
  showRightAction = false,
  formFields = 8,
  listRows = 8,
}: PageLoadingProps) {
  return (
    <div className="p-4 sm:p-6 space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          {showRightAction && <Skeleton className="h-9 w-24" />}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        {variant === "list" ? (
          <div className="space-y-3">
            {Array.from({ length: listRows }).map((_, i) => (
              <div className="grid grid-cols-6 gap-4" key={i}>
                <Skeleton className="col-span-2 h-5" />
                <Skeleton className="col-span-1 h-5" />
                <Skeleton className="col-span-1 h-5" />
                <Skeleton className="col-span-1 h-5" />
                <Skeleton className="col-span-1 h-5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: formFields }).map((_, i) => (
              <Skeleton className="h-10" key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
